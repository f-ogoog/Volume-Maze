import React from "react"
import "../css/Library.css"
import axios from 'axios'
import LogoImageLibrary from "../image/library/avatar.png"
import SearchStImg from "../image/library/search_st.png"
import SearchStImgD from "../image/library/search_st_d.png"
import SearchImg from "../image/main/search.png"
import LeftbookImg from "../image/library/left.png"
import RightbookImg from "../image/library/right.png"

const activBlock = {
    display: "initial",
};
const notActivBlock = {
    display: "none",
};
class Library extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            hoverSort: "no",
            hoverCategori: "no",
            selectedCategories: [],
            books: [],
            pageBook: 0, 
            pagination: [],
            search: '',
            sortbook: '',
            porsortbook: '',
        }
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.CategoriMouseEnter = this.CategoriMouseEnter.bind(this)
        this.BookInLibraryList = this.BookInLibraryList.bind(this)
        this.SortInfoBoock = this.SortInfoBoock.bind(this)

    }
    handleMouseLeave(mous) {
        this.setState({ hoverSort: mous });
    }
    CategoriMouseEnter(mous) {
        this.setState({ hoverCategori: mous });
    }
    Category(newValue) {
        if (this.state.selectedCategories.includes(newValue)) {
            this.setState(prevState => ({
                selectedCategories: prevState.selectedCategories.filter(item => item !== newValue)
            }), () => {
                this.BookInLibraryList(this.state.pageBook)
                console.log(this.state.selectedCategories);
            });
        } else {
            this.setState(prevState => ({
                selectedCategories: [...prevState.selectedCategories, newValue]
            }), () => {
                this.BookInLibraryList(this.state.pageBook)
                console.log(this.state.selectedCategories.join(' '));
            });
        }
    }
    SortInfoBoock(newValue){
        if(['title', 'rating'].includes(newValue)){
            this.setState({ sortbook: newValue });
        }else{
            this.setState({ porsortbook: newValue });
        }
    }
    BookInLibraryList = async (page) =>{
        const params = {
            page: page,
            search: this.state.search,
            category: this.state.selectedCategories,
        };
        if (this.state.sortbook !== "") {
            params.sort = this.state.sortbook;
        }
        if (this.state.porsortbook !== "") {
            params.order = this.state.porsortbook;
        }
        const response = (await axios.get('http://localhost:3000/books', {
            params: params
            }))
        console.log(params)
        const books = await response.data.data;
        const pagination = await response.data.pagination;
        console.log(response)
        this.setState({ books });
        this.setState({pagination: pagination});
        this.setState({ pageBook:  this.state.pagination.page});
    }
    UserInfo = () => {
        return this.props.value
    }
    componentDidMount() {
        console.log('componentDidMount called');
        this.ChangeSearchHome()
    }
    ChangeSearch = (event) => {
        this.setState({ search: event.target.value });
    }
    ChangeSearchHome = () => {
        console.log(this.props.searchhome);
        this.setState({ search: this.props.searchhome }, () => {
            this.BookInLibraryList(0);
        });
    }
    changeBookandPage = (page, id) => {
        const { changePage } = this.props;
        const { changeBook } = this.props;
        changePage(page)
        changeBook(id)
    }
    render(){
        const { books } = this.state;
        console.log(books)
        return(
            <div id="block_Library">
                <div id="block_prolile_in_library">
                    <p id="name_user_library">{this.UserInfo().username}</p>
                    <img src={this.UserInfo().avatar != null ? this.UserInfo().avatar : LogoImageLibrary} alt="" className="Img_logo_library"/>
                </div>
                <h1 id="h1_in_library">Перелік книг</h1>
                <div id="block_content_library">
                    <div id="all_block_sort_library">
                            <div id="block_search_labrary">
                                <input type="text" id="input_searc_labrary" placeholder="Пошук книг" onChange={this.ChangeSearch}/>
                                <button id="button_search_labrary" onClick={() => { this.BookInLibraryList(this.state.pageBook) }}><img src={SearchImg} alt="" id='img_search_labrary'/></button>
                            </div>
                        <div className="dropdown">
                            <button className="dropbtn"  onMouseEnter={() => {this.CategoriMouseEnter("yas")}} onMouseLeave={() => {this.CategoriMouseEnter("no")}}>Категорії<img src={this.state.hoverCategori === "no" ? SearchStImg : SearchStImgD} alt="" className="img_sort_labrary"/></button>
                            <div className="dropdown-content" onMouseEnter={() => {this.CategoriMouseEnter("yas")}} onMouseLeave={() => {this.CategoriMouseEnter("no")}}>
                                <div className="dropdown-section">
                                    <h3>Порядок сортування:</h3>
                                    <label><input type="checkbox" name="categori" value="Сучасна література" onChange={(event) => { this.Category(event.target.value) }}/>Сучасна література</label>
                                    <label><input type="checkbox" name="categori" value="Жахи та трилери" onChange={(event) => { this.Category(event.target.value) }}/>Жахи та трилери</label>
                                    <label><input type="checkbox" name="categori" value="Дитяча література" onChange={(event) => { this.Category(event.target.value) }}/>Дитяча література</label>
                                    <label><input type="checkbox" name="categori" value="Детективи" onChange={(event) => { this.Category(event.target.value) }}/>Детективи</label>
                                    <label><input type="checkbox" name="categori" value="Фантастика" onChange={(event) => { this.Category(event.target.value) }}/>Фантастика</label>
                                    <label><input type="checkbox" name="categori" value="Пригоди" onChange={(event) => { this.Category(event.target.value) }}/>Пригоди</label>
                                    <label><input type="checkbox" name="categori" value="Романи" onChange={(event) => { this.Category(event.target.value) }}/>Романи</label>
                                    <label><input type="checkbox" name="categori" value="Комікси" onChange={(event) => { this.Category(event.target.value) }}/>Комікси</label>
                                </div>
                                <div className="dropdown-section">
                                    <h3>Сортування за:</h3>
                                    <label><input type="checkbox" name="categori" value="Класична література" onChange={(event) => { this.Category(event.target.value) }}/>Класична література</label>
                                    <label><input type="checkbox" name="categori" value="Поезія" onChange={(event) => { this.Category(event.target.value) }}/>Поезія</label>
                                    <label><input type="checkbox" name="categori" value="Проза" onChange={(event) => { this.Category(event.target.value) }}/>Проза</label>
                                    <label><input type="checkbox" name="categori" value="Наукова література" onChange={(event) => { this.Category(event.target.value) }}/>Наукова література</label>
                                    <label><input type="checkbox" name="categori" value="Навчальна література" onChange={(event) => { this.Category(event.target.value) }}/>Навчальна література</label>
                                    <label><input type="checkbox" name="categori" value="Історична література" onChange={(event) => { this.Category(event.target.value) }}/>Історична література</label>
                                    <label><input type="checkbox" name="categori" value="Медична література" onChange={(event) => { this.Category(event.target.value) }}/>Медична література</label>
                                    <label><input type="checkbox" name="categori" value="Хобі" onChange={(event) => { this.Category(event.target.value) }}/>Хобі</label>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="dropbtn"  onMouseEnter={() => {this.handleMouseLeave("yas")}} onMouseLeave={() => {this.handleMouseLeave("no")}}>Сортування<img src={this.state.hoverSort === "no" ? SearchStImg : SearchStImgD} alt="" className="img_sort_labrary"/></button>
                            <div className="dropdown-content" onMouseEnter={() => {this.handleMouseLeave("yas")}} onMouseLeave={() => {this.handleMouseLeave("no")}}>
                                <div className="dropdown-section">
                                    <h3>Порядок сортування:</h3>
                                    <label><input type="radio" name="order" value="asc" onChange={(event) => { this.SortInfoBoock(event.target.value) }}/> За зростанням</label>
                                    <label><input type="radio" name="order" value="desc" onChange={(event) => { this.SortInfoBoock(event.target.value) }}/> За спаданням</label>
                                </div>
                                <div className="dropdown-section">
                                    <h3>Сортування за:</h3>
                                    <label><input type="radio" name="criteria" value="rating" onChange={(event) => { this.SortInfoBoock(event.target.value) }}/> За рейтингом</label>
                                    <label><input type="radio" name="criteria" value="title" onChange={(event) => { this.SortInfoBoock(event.target.value) }}/> За абеткою</label>
                                    <button className="apply-btn" onClick={() => {this.applySorting()}}>Застосувати</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="block_book_labrary">
                    {books.map(book => (
                        <button key={book.id} className="boock_in_library" onClick={() => this.changeBookandPage('book', book.id)}>
                            <img src={book.cover} alt="" className="img_book_in_content"/>
                            <h3 className="title_book">{book.title}</h3>
                            <p className="autor_info_book">{book.author}</p>
                            <p className="raitink_book_info">
                                {Array(Math.floor(book.rating / 2)).fill('★').join('')}
                                {Array(5 - Math.floor(book.rating / 2)).fill('☆').join('')}
                            </p>
                        </button>
                    ))}
                    </div>
                </div>
                <div id="block_pages">
                    <div id="block_book_button_page">
                        <button className="button_go_book_page" style={this.state.pagination.page >= 1 ? activBlock : notActivBlock} onClick={(event) => { this.BookInLibraryList(this.state.pagination.page - 1) }}><img src={LeftbookImg} alt="" className="img_button_book" /></button>
                        <button className="button_go_book_page" style={this.state.pagination.page >= 1 ? activBlock : notActivBlock} onClick={(event) => { this.BookInLibraryList(0) }}>1</button>
                        <button className="button_go_book_page total_page_now">{this.state.pagination.page + 1}
                        </button>
                        <button className="button_go_book_page" style={this.state.pagination.page <= this.state.pagination.totalPages - 3 ? activBlock : notActivBlock}>...</button>
                        <button className="button_go_book_page" style={this.state.pagination.page <= this.state.pagination.totalPages - 2 ? activBlock : notActivBlock} onClick={(event) => { this.BookInLibraryList(this.state.pagination.totalPages - 1) }}>
                            {this.state.pagination.totalPages}
                            </button>
                        <button className="button_go_book_page" style={this.state.pagination.page <= this.state.pagination.totalPages - 2 ? activBlock : notActivBlock} onClick={(event) => { this.BookInLibraryList(this.state.pagination.page + 1) }}><img src={RightbookImg} alt="" className="img_button_book"/></button>
                    </div>
                </div>
            </div>
        )
    }
    applySorting = async() => {
        // Отримуємо значення вибраних параметрів сортування
        const selectedOrder = document.querySelector('input[name="order"]:checked');
        const order = selectedOrder ? selectedOrder.value : null;
        const selectedCriteria = document.querySelector('input[name="criteria"]:checked');
        const criteria = selectedCriteria ? selectedCriteria.value : null;
    
        // Відображаємо обрані значення в консолі (або виконуємо необхідні дії)
        console.log('Order:', order);
        console.log('Criteria:', criteria);
        this.BookInLibraryList(this.state.pageBook)
    
        // Можна додати будь-яку додаткову логіку для застосування сортування
    }
}  

export default Library