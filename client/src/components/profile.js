import React from "react"
import "../css/profile.css"
import UserImg from "../image/library/avatar.png"
import ChangeProfile from "./changeprofile"
import axios from 'axios'

const activBlock = {
    display: "initial",
};
const notActivBlock = {
    display: "none",
};
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            changeProfile: "no",
            added: [],
            read: [],
            marked: [],
            
        }
        this.changePageprofile = this.changePageprofile.bind(this)
        this.savedInfoBook = this.savedInfoBook.bind(this)
    }
    UserInfo = () => {
        return this.props.value
    }
    changePageprofile(change) {
        this.setState({ changeProfile: change });
    }
    savedInfoBook = async (page, category) => {
        const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
        const config = {
            headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
        };
        const params = {
            pageSize: page,
        };
        try {
            const response = await axios.get(`http://localhost:3000/books/status/${category}`, {
                ...config,
                params: params
            });
            const added = await response.data.data;
            console.log(added)
            this.setState({ [category]: added });
        } catch (error) {
            console.error('Error fetching saved books:', error);
        }
    }
    componentDidMount() {
        this.savedInfoBook(0, "added")
        this.savedInfoBook(0, "read")
        this.savedInfoBook(0, "marked")
    }
    changeBookandPage = (page, id) => {
        const { changePage } = this.props;
        const { changeBook } = this.props;
        changePage(page)
        changeBook(id)
    }
    render(){
        const { read } = this.state;
        return(
            <div id="block_profile">
                <div id="main_prifile" style={this.state.changeProfile === "no" ? activBlock : notActivBlock}>
                    <div id="profile_Top" >
                        <div id="Texttop">
                            <label for="user" align ="right" id="profile_LabelTop">{this.UserInfo().username}</label>
                                <h3 align="right" id="profile_TextTop">
                                    <p>{this.UserInfo().description}</p>
                                </h3>
                        </div>
                        <div id="User">
                            <img src={this.UserInfo().avatar != null ? this.UserInfo().avatar : UserImg} id="user" alt=""/>
                        </div>
                    </div>
                    <div id="rothd"></div>
                    <div id ="profile_Bottom">
                        <div id="profile_LeftBottom">
                            <button id="profile_editButt" onClick={() => {this.changePageprofile("yas")}}>Редагувати дані</button>
                            <div id="profile_Statistics">
                                <h2 className="profile_h2">
                                <p>Статистика</p>
                                </h2>
                                <h3 className="profile_h3 save_boob_profile">
                                <p>Збережено:</p>
                                <p className="len_element_profile">{this.state.added.length}</p>
                                </h3>
                                <h3 className="profile_h3 save_boob_profile">
                                <p>Прочитано:</p>
                                <p className="len_element_profile">{this.state.read.length}</p>
                                </h3>
                                <h3 className="profile_h3 save_boob_profile">
                                <p>Оцінено:</p>
                                <p className="len_element_profile">{this.state.marked.length}</p>
                                </h3>
                            </div>
                        </div>
                        <div id="profile_Last_read">
                            <h2 className="profile_h2">
                            <p>Останнє прочитане</p>
                            </h2>
                            {read.slice(0, 3).map((book, index) => (
                            <React.Fragment key={book.id}>
                                <button className="profile_Book1" onClick={() => this.changeBookandPage('book', book.id)}>
                                    <img src={book.cover} alt="" className="img_boor_read_profile"/>
                                    <h3 className="profile_h3_in_read">
                                        <p>{book.title}</p>
                                    </h3>
                                </button>
                            </React.Fragment>
                        ))}
                        </div>
                    </div>
                </div>
                {this.state.changeProfile === 'yas' && <ChangeProfile inprofile={this.changePageprofile.bind(this)} value={this.UserInfo()}/>}
            </div>

        )
    }
}  

export default Profile