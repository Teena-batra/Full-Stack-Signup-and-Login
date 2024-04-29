function validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,}$/;


    if(values.username === ""){
        error.username = "usernmae should not be empty"
    }
    else {
        error.username = ""
    }
    
    if(values.email === ""){
        error.email = "email should not empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        
        //console.log("in",password_pattern.test(values.password))
        
        
        error.password = "Password didn't match"
    } else{
        error.password = ""
    }
//console.log("in",password_pattern.test(values.password))

    return error;
}
        
export default validation;