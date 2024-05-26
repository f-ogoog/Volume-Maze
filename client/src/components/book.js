import React from "react"
import "../css/book.css"
import changeBookImg from "../image/book/changeBook.png"
import changeBookFonImg from "../image/book/fon.png"
import BottomImg from "../image/book/bottom.png"
import TopImg from "../image/book/top.png"
import axios from 'axios'

const activBlock = {
    display: "block",
};
const notActivBlock = {
    display: "none",
};
const colorSave = {
    color: "#703F7D",
};
const colorNotSave = {
    color: "#2C2B87",
};
class Boock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bookAllInfo: [],
            changeDescriptOn: 0,
            description: '',
            descriptionTitle: '',
            buttonSaveDescription: 0,
            blockSave: 'no',
        }
        this.InfoBook = this.InfoBook.bind(this)
        this.ChangeUserDescriptionBook = this.ChangeUserDescriptionBook.bind(this)
        this.ChangeUserDescriptionallInfoBook = this.ChangeUserDescriptionallInfoBook.bind(this)
    }
    InfoBook = async () => {
        const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
        const config = {
            headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
        };
        try {
            console.log(`http://localhost:3000/books/${this.props.idBook}`)
            const response = await axios.get(`http://localhost:3000/books/${this.props.idBook}`, {
                ...config,
            });
            const bookAllInfo = await response.data;
            console.log(bookAllInfo)
            this.setState({ bookAllInfo: bookAllInfo });
        } catch (error) {
            console.error('Error fetching saved books:', error);
        }
    }
    componentDidMount() {
        this.InfoBook()
    }
    ChangeUserMarkBook = async (mark) => {
        const params = {
            value: mark,
        };
        const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
        
        const config = {
            headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
        };
    
        axios.patch(`http://localhost:3000/books/${this.state.bookAllInfo.id}/mark`, params, config) // Передаємо параметри та конфігурацію із заголовками
        .then(function (response) {
            console.log(response);
            alert("Оцінку було збережено");
        })
        .catch(function (error) {
            alert(error.response.data.message);
        });
    };
    ChangeUserDescriptionallInfoBook = async () => {
        this.setState({ changeDescriptOn: 0 });
        this.setState({ buttonSaveDescription: 0 });
        const params = {};
        if (this.state.descriptionTitle !== "") {
            params.descriptionTitle = this.state.descriptionTitle;
        }
        if (this.state.description !== "") {
            params.description = this.state.description;
        }
        const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
        
        const config = {
            headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
        };
    
        axios.patch(`http://localhost:3000/books/${this.state.bookAllInfo.id}`, params, config) // Передаємо параметри та конфігурацію із заголовками
        .then(function (response) {
            console.log(response);
            alert("Опис було успішно оновлено");
        })
        .catch(function (error) {
            alert(error.response.data.message);
        });
    };
    ChangeUserDescriptionBook(change) {
        this.setState({ changeDescriptOn: 1 });
    }
    CategoriSaveBook(status) {
        this.setState({ blockSave: status });
    }
    ChangeinfoBook = (event) => {
        this.setState({ buttonSaveDescription: 1 });
        this.setState({ [event.target.name]: event.target.value });
    }
    ChangeUserstatusBook = async (status) => {
        const params = {
            status: status,
        };
        const token = localStorage.getItem('authToken'); // Отримуємо токен з локального сховища
        
        const config = {
            headers: { Authorization: `Bearer ${token}` } // Додаємо токен у заголовок
        };
    
        axios.patch(`http://localhost:3000/books/${this.state.bookAllInfo.id}/status`, params, config) // Передаємо параметри та конфігурацію із заголовками
        .then(function (response) {
            console.log(response);
            alert("Книгу успішно збережено");
        })
        .catch(function (error) {
            alert(error.response.data.message);
        });
    };
    render(){
        const mark = this.state.bookAllInfo.mark != null ? this.state.bookAllInfo.mark : 0;
        console.log(mark)
        const filledStars = Math.floor(mark / 2);
        const emptyStars = 5 - filledStars;
        const filledStarButtons = Array(filledStars).fill(0).map((_, index) => (
        <button key={`button${index + 1}`} id={`button${index + 1}`} className="button_stars_in_book" onClick={() => { this.ChangeUserMarkBook((index + 1) * 2) }}>★</button>
        ));
        const emptyStarButtons = Array(emptyStars).fill(0).map((_, index) => (
        <button key={`button${index + 1 + filledStars}`} id={`button${index + 1 + filledStars}`} className="button_stars_in_book" onClick={() => { this.ChangeUserMarkBook((index + 1 + filledStars) * 2) }}>☆</button>
        ));
        return(
            <div id="block_book_page">
                <img src={changeBookFonImg} alt="" id="book_fon"/>
                <div id="Page_Top">
                    <div id="Page_Texttop">
                        <div id="Page_namebook" >
                            <p id="name_book_in_page_book">{this.state.bookAllInfo.title}</p>
                            <button id="button_change_description_book" onClick={() => this.ChangeUserDescriptionBook()}>
                                <img id="Page_imgedit" width="30" height="30" src={changeBookImg}/>
                            </button>
                        </div>
                        <div id="Pagerate_text">
                            <div className="circle">{this.state.bookAllInfo.rating}</div>
                            <div id="Page_to_column">
                                <div id="Page_Author" >
                                    <h2>Автор: </h2>
                                    <h2>{this.state.bookAllInfo.author}</h2>
                                </div>
                                <div id="Page_Cathegory">
                                    <h2>Категорія: </h2>
                                    <h2>{this.state.bookAllInfo.category}</h2>
                                </div>  
                            </div>
                        </div> 
                        <div id="Page_rothd"></div>  
                        <div id="Page_TopBottom">
                            <div className="stars">
                            <p className="raitink_book_info">
                                {filledStarButtons}
                                {emptyStarButtons}
                            </p>
                            </div>
                            <button id="Page_ButtSave" onMouseEnter={() => {this.CategoriSaveBook("yas")}} onMouseLeave={() => {this.CategoriSaveBook("no")}}>
                                <div id="block_in_button_save_book">
                                    <p>{this.state.bookAllInfo.status === "ADDED" || this.state.bookAllInfo.status === "READ" ?
                                    (this.state.bookAllInfo.status === "ADDED" ? "Додано" : "Прочитано") : "Зберегти"}</p>
                                    <img src={BottomImg} alt="" className="img_button_save_book" style={this.state.blockSave === "no" ? activBlock : notActivBlock}/>
                                    <img src={TopImg} alt="" className="img_button_save_book" style={this.state.blockSave === "yas" ? activBlock : notActivBlock}/>
                                </div>
                                <button class="save_element_book" style={this.state.blockSave === "yas" ? activBlock : notActivBlock} onClick={() => this.ChangeUserstatusBook('ADDED')}><p style={this.state.bookAllInfo.status === "ADDED" ? colorSave : colorNotSave}>Додано</p></button>
                                <button class="save_element_book" style={this.state.blockSave === "yas"? activBlock : notActivBlock} onClick={() => this.ChangeUserstatusBook('READ')}><p style={this.state.bookAllInfo.status === "READ" ? colorSave : colorNotSave}>Прочитано</p></button>
                            </button>
                        </div> 
                    </div>
                    <img id="Page_Book" src={this.state.bookAllInfo.cover}/>
                </div>
                <div id="Page_Description">
                <h2 id="Page_H2" style={this.state.changeDescriptOn === 0 ? activBlock : notActivBlock}>{this.state.bookAllInfo.descriptionTitle}</h2>
                <input name='descriptionTitle' id="Page_H2" type="text" defaultValue={this.state.bookAllInfo.descriptionTitle} style={this.state.changeDescriptOn === 1 ? activBlock : notActivBlock} onChange={this.ChangeinfoBook}/>
                    <h4 id="Page_H4" style={this.state.changeDescriptOn === 0 ? activBlock : notActivBlock}>
                        <p>{this.state.bookAllInfo.description}</p>
                    </h4>
                    <textarea 
                        name="description"
                        id="Page_H4"
                        className="class_change_description_book"
                        defaultValue={this.state.bookAllInfo.description} 
                        style={this.state.changeDescriptOn === 1 ? activBlock : notActivBlock}
                        onChange={this.ChangeinfoBook}>
                    </textarea>
                    <button id="Page_ButtSave_description" style={this.state.buttonSaveDescription === 1 ? activBlock : notActivBlock} onClick={() => this.ChangeUserDescriptionallInfoBook()}>Зберегти  зміни</button>
                <div id="Page_rothd_end"></div>  
                </div>
            </div>
        )
    }
}  

export default Boock