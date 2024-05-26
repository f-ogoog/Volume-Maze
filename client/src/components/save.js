import React from "react"
import "../css/save.css"
import LogoImageLibrary from "../image/library/avatar.png"
import downImg from "../image/save/down.png"
import topImg from "../image/save/top.png"
import axios from 'axios'

const activBlock = {
    display: "initial",
};
const activBlockFlex = {
    display: "flex",
};
const notActivBlock = {
    display: "none",
};
class Save extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            added: [],
            read: [],
            marked: [],
            pageSave: "litl",
        }
        this.savedInfoBook = this.savedInfoBook.bind(this)
        this.changePagesave = this.changePagesave.bind(this)
    }
    componentDidMount() {
        this.savedInfoBook(4, "added")
        // this.BookInLibraryList(0);
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
    changePagesave = (change) => {
        this.savedInfoBook(4, "read")
        this.savedInfoBook(4, "marked")
        this.setState({ pageSave: change });
    }
    changePagesaveAll = (change) => {
        this.savedInfoBook(0, "added")
        this.savedInfoBook(0, "read")
        this.savedInfoBook(0, "marked")
        this.setState({ pageSave: change });
    }
    changeBookandPage = (page, id) => {
        const { changePage } = this.props;
        const { changeBook } = this.props;
        changePage(page)
        changeBook(id)
    }
    render(){
        const { added } = this.state;
        const { read } = this.state;
        const { marked } = this.state;
        return(
            <div id="block_save">
                <div id="Savedsh_Top">
                    <p id="Savedsh_Username" >{this.props.value.username}</p>
                    <div id="Savedsh_image">
                        <img src={this.props.value.avatar != null ? this.props.value.avatar : LogoImageLibrary} id="user" alt=''/>
                    </div>   
                    
                </div>
            <div id="Savedsh_center">
                <label id="Savedsh_labelsvd">Збережене</label>
                <div className="block_all_info_save" style={this.state.pageSave === "all" || this.state.pageSave === "allAlladded" ? activBlockFlex : notActivBlock}>
                    <div className="block_category_save">
                        <p className='text_in_all_block_save'>Додано</p>
                        <button className="button_down_in_save_all" onClick={() => {this.changePagesaveAll("allAlladded")}} style={this.state.pageSave === "all" ? activBlockFlex : notActivBlock}>
                            <img src={downImg} alt="" className="img_down_in_save_all"/>
                        </button>
                        <button className="button_down_in_save_all" onClick={() => {this.changePagesave("all")}} style={this.state.pageSave === "allAlladded" ? activBlockFlex : notActivBlock}>
                            <img src={topImg} alt="" className="img_down_in_save_all"/>
                        </button>
                    </div>
                    <div style={this.state.pageSave === "allAlladded" ? activBlockFlex : notActivBlock} className="save_all_in_categor">
                        {added.map((book, index) => (
                            <React.Fragment key={book.id}>
                                <button className="Savedsh_book" onClick={() => this.changeBookandPage('book', book.id)}>
                                <img className="Savedsh_img" src={book.cover}/>
                                <h4>
                                    <p className="Savedsh_Namebook">{book.title}</p>
                                    <p className="Savedsh_Author">{book.author}</p>
                                    <p className="Savedsh_Date">
                                    {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                    {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                    </p>
                                </h4>
                                </button>
                                {index > 0 && (index + 1) % 4 === 0 && <div className="rothd"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div id="Savedsh_books" style={this.state.pageSave === "all" || this.state.pageSave === "litl" ? activBlockFlex : notActivBlock}>
                    {added.map(book => (
                            <button key={book.id} className="Savedsh_book" onClick={() => this.changeBookandPage('book', book.id)}>
                                <img className="Savedsh_img" src={book.cover}/>
                                <h4>
                                    <p className="Savedsh_Namebook">{book.title}</p>
                                    <p className="Savedsh_Author">{book.author}</p>
                                    <p className="Savedsh_Date">
                                        {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                        {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                    </p>
                                </h4>
                            </button>
                        ))}
                </div>  
                <div id="svdrothd" style={this.state.pageSave === "all" || this.state.pageSave === "litl" ? activBlockFlex : notActivBlock}></div>
                <div className="block_all_info_save" style={this.state.pageSave === "all" || this.state.pageSave === "allAllread" ? activBlockFlex : notActivBlock}>
                    <div className="block_category_save">
                        <p className='text_in_all_block_save'>Прочитано</p>
                        <button className="button_down_in_save_all" onClick={() => {this.changePagesaveAll("allAllread")}} style={this.state.pageSave === "all" ? activBlockFlex : notActivBlock}>
                            <img src={downImg} alt="" className="img_down_in_save_all"/>
                        </button>
                        <button className="button_down_in_save_all" onClick={() => {this.changePagesave("all")}} style={this.state.pageSave === "allAllread" ? activBlockFlex : notActivBlock}>
                            <img src={topImg} alt="" className="img_down_in_save_all"/>
                        </button>
                    </div>
                    <div style={this.state.pageSave === "allAllread" ? activBlockFlex : notActivBlock} className="save_all_in_categor">
                        {read.map((book, index) => (
                            <React.Fragment key={book.id}>
                                <button className="Savedsh_book" onClick={() => this.changeBookandPage('book', book.id)}>
                                <img className="Savedsh_img" src={book.cover}/>
                                <h4>
                                    <p className="Savedsh_Namebook">{book.title}</p>
                                    <p className="Savedsh_Author">{book.author}</p>
                                    <p className="Savedsh_Date">
                                    {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                    {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                    </p>
                                </h4>
                                </button>
                                {index > 0 && (index + 1) % 4 === 0 && <div className="rothd"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div id="Savedsh_books" style={this.state.pageSave === "all" ? activBlockFlex : notActivBlock}>
                    {read.map(book => (
                            <button key={book.id} className="Savedsh_book" onClick={() => this.changeBookandPage('book', book.id)}>
                                <img className="Savedsh_img" src={book.cover}/>
                                <h4>
                                    <p className="Savedsh_Namebook">{book.title}</p>
                                    <p className="Savedsh_Author">{book.author}</p>
                                    <p className="Savedsh_Date">
                                        {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                        {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                    </p>
                                </h4>
                            </button>
                        ))}
                </div>
                <div id="svdrothd" style={this.state.pageSave === "all" ? activBlockFlex : notActivBlock}></div>
                <div className="block_all_info_save" style={this.state.pageSave === "all" || this.state.pageSave === "allAllmarked" ? activBlockFlex : notActivBlock}>
                    <div className="block_category_save">
                        <p className='text_in_all_block_save'>Оцінено</p>
                        <button className="button_down_in_save_all" onClick={() => {this.changePagesaveAll("allAllmarked")}} style={this.state.pageSave === "all" ? activBlockFlex : notActivBlock}>
                            <img src={downImg} alt="" className="img_down_in_save_all"/>
                        </button>
                        <button className="button_down_in_save_all" onClick={() => {this.changePagesave("all")}} style={this.state.pageSave === "allAllmarked" ? activBlockFlex : notActivBlock}>
                            <img src={topImg} alt="" className="img_top_in_save_all"/>
                        </button>
                    </div>
                    <div style={this.state.pageSave === "allAllmarked" ? activBlockFlex : notActivBlock} className="save_all_in_categor">
                        {marked.map((book, index) => (
                            <React.Fragment key={book.id}>
                                <button className="Savedsh_book" onClick={() => this.changeBookandPage('book', book.id)}>
                                <img className="Savedsh_img" src={book.cover}/>
                                <h4>
                                    <p className="Savedsh_Namebook">{book.title}</p>
                                    <p className="Savedsh_Author">{book.author}</p>
                                    <p className="Savedsh_Date">
                                    {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                    {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                    </p>
                                </h4>
                                </button>
                                {index > 0 && (index + 1) % 4 === 0 && <div className="rothd"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div id="Savedsh_books" style={this.state.pageSave === "all"  ? activBlockFlex : notActivBlock}>
                    {marked.map(book => (
                            <button key={book.id} className="Savedsh_book" onClick={() => this.changeBookandPage('book', book.id)}>
                                <img className="Savedsh_img" src={book.cover}/>
                                <h4>
                                    <p className="Savedsh_Namebook">{book.title}</p>
                                    <p className="Savedsh_Author">{book.author}</p>
                                    <p className="Savedsh_Date">
                                        {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                        {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                                    </p>
                                </h4>
                            </button>
                        ))}
                </div>
                <button id="Savedsh_button" onClick={() => {this.changePagesave("all")}} style={this.state.pageSave === "litl" ? activBlock : notActivBlock}>Розгорнути</button>
            </div>
            </div>
        )
    }
}  

export default Save