import React from "react"
import "../css/Register.css"
import FonRegister from "../image/register/fon_register.png"
import backing from "../image/register/back.png"
import Home from "./home"
import axios from 'axios'

const activBlockMain = {
    display: "flex",
};
const oncolor = {
    background: "#292796",
    color: "#E4DBCD",
};
const ofcolor = {
    background: "#29279600",
    color: "#292796",
};
const activBlock = {
    display: "block",
};
const notActivBlock = {
    display: "none",
};
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ActivRegLog: "Reg",
            PageActiv: "RegLog",
            usernameLogin: '',
            passwordLogin: '',
            Loginreg: '',
            gmailreg: '',
            passreg: '',
            pass2reg: ''
        }
        this.RegLog = this.RegLog.bind(this)
        this.RegisterNewAkk = this.RegisterNewAkk.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.ChangeRegisterInput = this.ChangeRegisterInput.bind(this)
    }
    ChangeRegisterInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    render(){
        return(
            <div id="full_block">
                <div id="mainBlock" style={this.state.PageActiv === "RegLog" ? activBlockMain : notActivBlock}>
                    <button id="button_reg_back" onClick={() => {this.PageAct("Main")}}><img src={backing} alt=""/></button>
                    <div id="block_reg_log">
                        <div id="block_register">
                            <div id="block_change">
                                <button className="butoon_reg_log" id="button_reg" onClick={() => {this.RegLog("Reg")}} style={this.state.ActivRegLog === "Reg" ? oncolor : ofcolor}>Реєстрація</button>
                                <button className="butoon_reg_log" id="button_log" onClick={() => {this.RegLog("Log")}} style={this.state.ActivRegLog === "Log" ? oncolor : ofcolor}>Вхід</button>
                            </div>
                            <div id="all_block_reg_wach" style={this.state.ActivRegLog === "Reg" ? activBlock : notActivBlock}>
                                <p id="p_name_reg" className="element_text">Ім’я користувача</p>
                                <input type="text" className="input_info" onChange={this.ChangeRegisterInput} name="Loginreg"/>
                                <p id="p_grail" className="element_text">Пошта</p>
                                <input type="text" className="input_info" onChange={this.ChangeRegisterInput} name="gmailreg"/>
                                <p id="p_pass" className="element_text">Пароль</p>
                                <input type="password" className="input_info" onChange={this.ChangeRegisterInput} name="passreg"/>
                                <p id="p_pass_replese" className="element_text">Повторіть пароль</p>
                                <input type="password" className="input_info" onChange={this.ChangeRegisterInput} name="pass2reg"/>
                                <button id="butoon_register" className="button_reg_log" onClick={() => {this.RegisterNewAkk()}}>Реєстрація</button>
                            </div>
                            <div id="all_block_log_wach" style={this.state.ActivRegLog === "Log" ? activBlock : notActivBlock}>
                                <p id="p_name_log" className="element_text">Ім’я користувача</p>
                                <input type="text" className="input_info" onChange={this.handleUsernameChange}/>
                                <p id="p_pass" className="element_text">Пароль</p>
                                <input type="password" className="input_info" onChange={this.handlePasswordChange}/>
                                <button id="butoon_login" className="button_reg_log" onClick={() => {this.Register()}}>Увійти</button>
                            </div>
                        </div>
                    </div>
                    <img src={FonRegister} alt="" id="image_register"/>
                </div>
                {this.state.PageActiv === 'Main' && <Home />}
            </div>
        )
    }
    RegisterNewAkk = async () => {
        const { Loginreg, gmailreg, passreg, pass2reg } = this.state;
        if (passreg === pass2reg){
            axios.post('http://localhost:3000/auth/register', {
            username: Loginreg,
            email: gmailreg,
            password: passreg
        })
        .then(function (response) {
            console.log(response);
            alert("Успішна реєстрація акаунта")
        })
        .catch(function (error) {
            alert(error.response.data.message)
        });
        }
        else{
            alert("Паролі не співпадають")
        }

    };
    Register = async () => {
        const { username, password } = this.state;
        const { changePage } = this.props;
        const { changeAutorized } = this.props;
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
            username: username,
            password: password,
        });
    
        const token = response.data.accessToken; // Припускаємо, що токен міститься в полі `token` відповіді
        console.log('Token:', token);
        localStorage.setItem('authToken', token);
    
        const userResponse = await axios.get('http://localhost:3000/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        console.log(userResponse.data);
        changePage('Main')
        changeAutorized('yas')
        } catch (error) {
            console.error('Login failed');
            alert("Не коректні дані")
        }
    };
    RegLog = (reglog) => {
        this.setState({ActivRegLog: reglog});
    }
    PageAct = (Page) => {
        this.setState({PageActiv: Page});
    }
}  

// username: 'Fred',
// password: '123qwe',

export default Register