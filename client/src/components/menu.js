import React from "react"
import "../css/menu.css"
import LogoImage from "../image/menu/logo.png"
import MainPageImage from "../image/menu/mainPage.png"
import LibraryPageImage from "../image/menu/library.png"
import SavePageImage from "../image/menu/save.png"
import ProfilePageImage from "../image/menu/profile.png"

class Menu extends React.Component{
    render(){
        const { changePage } = this.props;
        return(
            <div id="block_menu">
                <button id="button_logo" className="class_button_menu menu-item">
                    <img src={LogoImage} alt="" className="logo_img"/>
                    <p className="text_in_meny" id="text_logo">Volume Maze</p>
                </button>
                <button id="button_main_page" className="class_button_menu menu-item" onClick={() => changePage('Main')}>
                    <img src={MainPageImage} alt="" className="image_in_menu"/>
                    <p className="text_in_meny">Головна сторінка</p>
                </button>
                <button id="button_library" className="class_button_menu menu-item" onClick={() => changePage('Library')}>
                    <img src={LibraryPageImage} alt="" className="image_in_menu"/>
                    <p className="text_in_meny">Бібліотека</p>
                </button>
                <button id="button_save" className="class_button_menu menu-item" onClick={() => changePage('save')}>
                    <img src={SavePageImage} alt="" className="image_in_menu"/>
                    <p className="text_in_meny">Збережене</p>
                </button>
                <button id="button_profile" className="class_button_menu menu-item" onClick={() => changePage('profile')}>
                    <img src={ProfilePageImage} alt="" className="image_in_menu"/>
                    <p className="text_in_meny" >Профіль</p>
                </button>
            </div>
        )
    }
}  

export default Menu