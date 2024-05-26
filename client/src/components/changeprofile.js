import React from "react"
import "../css/changeprofile.css"
import FonRegister from "../image/register/fon_register.png"
import backing from "../image/register/back.png"
import ChangeLogoImg from "../image/profile/changeLogo.png"
import axios from 'axios'

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
class ChangeProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ActivRegLog: "profile",
            newName: '',
            newDescription: '',
            urlAvaterChange: '',
            urlImgBlock: '0',
            passwordHave: '',
            newPassword: '',
            newPassword2: '',

        }
        this.RegLog = this.RegLog.bind(this)
        this.ChangeinfoUser = this.ChangeinfoUser.bind(this)
        this.Changeurlimg = this.Changeurlimg.bind(this)
    }
    ChangeinfoUser = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    Changeurlimg = () => {
        this.setState({ urlImgBlock: '1' });
    }
    ChangeUserFunk = async () => {
        const { newName, newDescription, urlAvaterChange } = this.state;
        const params = {};
        const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
        console.log(token);
    
        if (newName !== "") {
            params.username = newName;
        }
        if (newDescription !== "") {
            params.description = newDescription;
        }
        if (urlAvaterChange !== "") {
            params.avatar = urlAvaterChange;
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
        };
    
        axios.patch('http://localhost:3000/users', params, config) // Передаємо параметри та конфігурацію із заголовками
        .then(function (response) {
            console.log(response);
            alert("Успішне оновлення акаунта");
        })
        .catch(function (error) {
            alert(error.response.data.message);
        });
    };
    ChangeUserPassword = async () => {
        if (this.state.newPassword === this.state.newPassword2){
            const params = {
                oldPassword: this.state.passwordHave,
                newPassword: this.state.newPassword,
            };
            const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
            
            const config = {
                headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
            };
        
            axios.patch(`http://localhost:3000/auth/password`, params, config) // Передаємо параметри та конфігурацію із заголовками
            .then(function (response) {
                console.log(response);
                alert("Пароль успішно змінено");
            })
            .catch(function (error) {
                alert(error.response.data.message);
            });
        }else{
            alert("Паролі не збігаються")
        }
    };
    render(){
        const { inprofile } = this.props;
        return(
            <div id="block_change_profile">
                <div id="mainBlock">
                    <button id="button_reg_back" onClick={() => inprofile('no')}><img src={backing} alt=""/></button>
                    <div id="block_reg_log">
                        <div id="block_register">
                            <div id="block_change">
                                <button className="butoon_reg_log" id="button_reg" onClick={() => {this.RegLog("profile")}} style={this.state.ActivRegLog === "profile" ? oncolor : ofcolor}>Профіль</button>
                                <button className="butoon_reg_log" id="button_log" onClick={() => {this.RegLog("password")}} style={this.state.ActivRegLog === "password" ? oncolor : ofcolor}>Пароль</button>
                            </div>
                            <div id="all_block_reg_wach" style={this.state.ActivRegLog === "profile" ? activBlock : notActivBlock}>
                                <p id='change_name' className="element_text_profile">Змінити Ім’я</p>
                                <input type="text" className="input_info" id="change_name_input" name='newName' onChange={this.ChangeinfoUser}/>
                                <p id="change_discription" className="element_text_profile">Змінити опис профілю</p>
                                <textarea id="" className="input_info input_big_info" name='newDescription' onChange={this.ChangeinfoUser}></textarea>
                                <div id="block_change_img" style={this.state.urlImgBlock === "1" ? activBlock : notActivBlock}>
                                    <p id='change_img' className="element_text_profile">Введіть посилання на фото</p>
                                    <input type="text" className="input_info" id="change_name_input" name='urlAvaterChange' onChange={this.ChangeinfoUser}/>
                                </div>
                                <div id="block_in_change_profile">
                                    <button id="button_change_img" onClick={() => {this.Changeurlimg()}}>
                                        <img src={ChangeLogoImg} alt="" id='change_logo_img'/>
                                    </button>
                                    <button id="butoon_save_change" className="button_reg_log" onClick={() => {this.ChangeUserFunk()}}>Зберегти зміни</button>
                                </div>
                            </div>
                            <div id="all_block_log_wach" style={this.state.ActivRegLog === "password" ? activBlock : notActivBlock}>
                                <p id="change_pass_text" className="element_text_profile">Змінити пароль</p>
                                <input type="text" className="input_info change_pass_input" placeholder="Поточний пароль" name='passwordHave' onChange={this.ChangeinfoUser}/>
                                <input type="text" className="input_info change_pass_input" placeholder="Новий пароль" name='newPassword' onChange={this.ChangeinfoUser}/>
                                <input type="text" className="input_info change_pass_input" placeholder="Підтвердження паролю" name='newPassword2' onChange={this.ChangeinfoUser}/>
                                <button id="butoon_change_pass" onClick={() => {this.ChangeUserPassword()}}>Зберегти зміни</button>
                            </div>
                        </div>
                    </div>
                    <img src={FonRegister} alt="" id="image_register"/>
                </div>
            </div>
        )
    }
    RegLog = (reglog) => {
        this.setState({ActivRegLog: reglog});
    }
}  

export default ChangeProfile