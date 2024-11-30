export const getUserIp = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip.includes('::ffff:') ? ip.split('::ffff:')[1] : ip;
    

};

export const getGeoLocation = async (ip) => {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la géolocalisation :', error.message);
        return null;
    }
};

export const getCountry = async (req, res) => {
    const userId = req.query.userId;  // Simulation d'une connexion utilisateur avec l'ID en query param

    // Récupérer l'IP de l'utilisateur
    const userIP = getUserIp(req);

    // Récupérer les informations de géolocalisation
    const geoData = await getGeoLocation(userIP);

    if (geoData && geoData.status === 'success') {
        const countryName = geoData.country;
        const countryCode = geoData.countryCode;

        // Vérifier si le pays existe déjà dans la base de données
        let country = await Country.findOne({ where: { code: countryCode } });

        if (!country) {
            // Si le pays n'existe pas, l'ajouter
            country = await Country.create({
                name: countryName,
                code: countryCode,
            });
        }

        // Associer le pays à l'utilisateur
        const user = await User.findByPk(userId);
        if (user) {
            await UserCountry.create({
                user_id: userId,
                country_id: country.id,
            });
            res.send(`Le pays ${countryName} a été associé à l'utilisateur.`);
        } else {
            res.status(404).send('Utilisateur non trouvé.');
        }
    } else {
        res.status(500).send('Impossible de déterminer la géolocalisation.');
    }
}