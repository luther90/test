
//Erreurs d'inscriptions
module.exports.signUpErrors = (err) => {
    let errors = { username: "", email: "", password: "" };

    if (err.message.includes("username"))
        errors.username = "username incorrect ou déjà utilisé";
    if (err.message.includes("email")) errors.email = "Email incorrect";
    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit faire 6 caracteres minimum";
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
        errors.username = "Ce username est déjà utilisé";
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà utilisé";

    return errors;
};


//Erreurs de connexion
module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes('email'))
        errors.email = "Email Inconnu"

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

    return errors
}