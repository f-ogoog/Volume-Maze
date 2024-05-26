import React from "react"
import axios from 'axios'
import "../css/Home.css"
import MainImage from "../image/main/MainImage.png"
import SearchImg from "../image/main/search.png"
import LeftSlaysImg from "../image/main/left_slayd.png"
import RightSlaysImg from "../image/main/right_slayd.png"
import Register from "./Register"
import Profile from "./profile"
import Library from "./Library"
import MenuBlock from "./menu"
import Book from "./book"
import Save from "./save"

const activBlockMain = {
    display: "flex",
};
const activBlock = {
    display: "initial",
};
const notActivBlock = {
    display: "none",
};
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            PageActiv: "Main",
            Authorized: "no",
            slayd: 35.4,
            targetIndex: 5,
            user: [],
            tokin: '',
            idBook: '',
            books: [],
            search: '',
        }
        this.PageAct = this.PageAct.bind(this)
        this.moveSlaydFunk = this.moveSlaydFunk.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.BookHomeList = this.BookHomeList.bind(this)
    }
    changePage(page) {
        this.setState({ PageActiv: page });
    }
    changeBook(id) {
        this.setState({ idBook: id });
    }
    changeAutorized(aut) {
        this.setState({ Authorized: aut });
    }
    componentDidMount() {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Якщо токен існує, зробити запит для отримання даних користувача
            axios.get('http://localhost:3000/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            this.setState({ userData: response.data });
            console.log('User data:', response.data);
            this.setState({Authorized: "yas"});
            this.setState({user: response.data});
            this.setState({tokin: response});
            this.BookHomeList()
        })
        .catch(error => {
            console.error('Error fetching user data', error);
        });
        }
    }
    BookHomeList = async () =>{
        const params = {
            page: 0,
            pageSize: 10,
            sort: "rating",
            order: "desc",
        };
        const response = (await axios.get('http://localhost:3000/books', {
            params: params
            }))
        const books = await response.data.data;
        console.log(books)
        this.setState({ books: books });
    }
    ChangeSearchHome = (event) => {
        this.setState({ search: event.target.value });
    }
    changeBookandPage = (page, id) => {
        this.changePage(page)
        this.changeBook(id)
    }
    render(){
        const { books } = this.state;
        return(
            <div id="full_block">
                {this.state.Authorized === "yas" && <MenuBlock changePage={this.changePage.bind(this)}/>}

                <div id="main" style={this.state.PageActiv === "Main" ? activBlockMain : notActivBlock}>
                    <div id="image">
                        <img src={MainImage} alt="" className="image_fon_main"/>
                    </div>
                    <div id="Textinfo">
                        <h1>
                            Вітаємо у 
                            лабіринті книг
                        
                        </h1>
                        <h2>
                        <p id="text_h2_main">Це мережа де кожен книголюб зможе знайти собі книгу по душі та слідкувати за новинами книжкового світу.
                            <br/>Шукай, дізнавайся, оцінюй, пиши!
                        </p>
                        </h2>
                            <button className="custom-button" onClick={() => {this.PageAct("RegLog")}} style={this.state.Authorized === "no" ? activBlock : notActivBlock}> Реєстрація \ вхід</button>
                            <div id="block_search" style={this.state.Authorized === "yas" ? activBlockMain : notActivBlock}>
                                <input type="text" id="input_searc" placeholder="Пошук книг" onChange={this.ChangeSearchHome}/>
                                <button id="button_search"><img src={SearchImg} alt="" id='img_search' onClick={() => this.changePage('Library')}/></button>
                            </div>
                    </div>
                </div>
                <div id="block_all_slayder" style={this.state.Authorized === "yas" && this.state.PageActiv === "Main" ? activBlock : notActivBlock}>
                        <h2 id="text_slayd">Популярні книги</h2>
                        <div id="block_slider">
                            <button id="button_left_slayd" className="button_in_slayder"><img src={LeftSlaysImg} alt="" onClick={() => {this.moveSlaydFunk(this.state.slayd + 71.8, this.state.targetIndex - 1)}} style={this.state.targetIndex > 1 ? activBlockMain : notActivBlock}/></button>
                            <button id="button_right_slayd" className="button_in_slayder"><img src={RightSlaysImg} alt="" onClick={() => {this.moveSlaydFunk(this.state.slayd - 71.8, this.state.targetIndex + 1)}} style={this.state.targetIndex < 10 ? activBlockMain : notActivBlock}/></button>
                            <div id="slider_line" style={{ transform: `translateX(${this.state.slayd}vw)` }}>
                            {books.map((book, index) => (
                                <div
                                    key={index}
                                    className="element_slayd"
                                    style={{ transform: `scale(${this.state.targetIndex === (index + 1) ? 1 : 0.94})` }}
                                >
                                    <div className="block_in_slays_hame_book">
                                        <div className="block_left_in_stayd_home">
                                            <h4 className="title_book_in_home">{book.title}</h4>
                                            <p className="autor_book_in_home">{book.author}</p>
                                            <p className="raitink_book_info_home">
                                                {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                                {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                            </p>
                                            {/* <p className="description_book_home"></p> */}
                                            <button className="Open_book_in_home" onClick={() => this.changeBookandPage('book', book.id)}>Відкрити подробиці</button>
                                        </div>
                                        <img src={book.cover} alt="" className="img_slayder_home"/>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                </div>
                <div id="block_folder" style={this.state.Authorized === "yas" && this.state.PageActiv === "Main" ? activBlockMain : notActivBlock}>
                    <p id="text_in_block_folder">©2024 VolumeMaze</p>
                    <div className="block_navigation">
                        <p id="text_navigation" className="text_in_block_folder_blue">Навігація</p>
                        <button className="button_navigation">Головна</button>
                        <button className="button_navigation" onClick={() => this.changePage('Library')}>Бібліотека</button>
                        <button className="button_navigation" onClick={() => this.changePage('save')}>Збережене</button>
                        <button className="button_navigation" onClick={() => this.changePage('profile')}>Профіль</button>
                    </div>
                    <div className="block_navigation">
                        <p id="text_team"  className="text_in_block_folder_blue">Команда</p>
                        <a className="text_team_name" target="_blank" href="https://www.instagram.com/your_konserva/">Консерва</a>
                        <a className="text_team_name" target="_blank" href="https://www.instagram.com/_anna1in_?igsh=MTE2bnNxYzIwbmZzOQ==">Королева</a>
                        <a className="text_team_name" target="_blank" href="https://t.me/fogoog">Алєх</a>
                        <a className="text_team_name" target="_blank" href="https://www.instagram.com/vlad14582?igsh=eXU3cDJ2djdidG5k">Влад</a>
                        
                    </div>
                </div>
                {this.state.PageActiv === 'RegLog' && <Register changePage={this.changePage.bind(this)} changeAutorized={this.changeAutorized.bind(this)}/>}
                {this.state.PageActiv === 'profile' && <Profile value={this.state.user} changePage={this.changePage.bind(this)} changeBook={this.changeBook.bind(this)}/>}
                {this.state.PageActiv === 'Library' && <Library value={this.state.user} changePage={this.changePage.bind(this)} changeBook={this.changeBook.bind(this)} searchhome={this.state.search}/>}
                {this.state.PageActiv === 'save' && <Save value={this.state.user} changePage={this.changePage.bind(this)} changeBook={this.changeBook.bind(this)}/>}
                {this.state.PageActiv === 'book' && <Book idBook={this.state.idBook}/>}
            </div>
        )
    }
    PageAct = async(Page) => {
        this.setState({PageActiv: Page});
    };
    moveSlaydFunk = (move, bigelem) => {
        this.setState({slayd: move});
        this.setState({targetIndex: bigelem});
    };
}
// localStorage.removeItem('authToken');
export default Home