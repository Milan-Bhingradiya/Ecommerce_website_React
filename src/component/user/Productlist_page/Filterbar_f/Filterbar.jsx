import React, { useCallback, useContext, useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import Usercontext from '../../context/Usercontext';
import axios from '../../axios';



export default function Filterbar() {

    const {metal,subcategory,getcategories, category, allproduct, fetchproducts, setselectedSubCategory, setselectedTags, setselectedMetal } = useContext(Usercontext)



    const toggleDropdown = useCallback((dropdownContentDiv) => {
        // Your toggleDropdown logic here
        dropdownContentDiv.style.display = (dropdownContentDiv.style.display === "block") ? "none" : "block";
    }, []);

    const showDropdown = useCallback((dropdownContentDiv) => {
        dropdownContentDiv.style.display = "block";
    }, []);

    const hideDropdown = useCallback((dropdownContentDiv) => {
        dropdownContentDiv.style.display = "none";
    }, []);


    const handleSubCategory_CheckboxOnChange = async (event) => {
        const clickedCheckbox = document.getElementById(event.target.id);
        const subCategoryName = event.target.id;


        setselectedSubCategory((prevSelected) => {
            const isSelected = prevSelected.includes(subCategoryName);
    
            if (clickedCheckbox.checked) {
                if (!isSelected) {
                    return [...prevSelected, subCategoryName];
                }
            } else {
                if (isSelected) {
                    return prevSelected.filter(id => id !== subCategoryName);
                }
            }
    
            return prevSelected;
        });
      
    }


    //TODO:sanket not aded till ....
    const handleMetal_CheckboxOnChange = (event) => {
        const clickedCheckbox = document.getElementById(event.target.id);
        if (clickedCheckbox.checked) {
            setselectedMetal((prevSelected) => {
                return prevSelected + "," + `${event.target.id}`;
            })
        } else {
            setselectedMetal((prevSelected) => {
                return prevSelected.replace(`${event.target.id}`, "");
            })

        }
    }


    const handleTag_CheckboxOnChange = (event) => {
        const clickedCheckbox = document.getElementById(event.target.id);
        if (clickedCheckbox.checked) {
            setselectedTags((prevSelected) => {
                return prevSelected + "," + `${event.target.id}`;
            })
        } else {
            setselectedTags((prevSelected) => {
                return prevSelected.replace(`${event.target.id}`, "");
            })
        }
    }




    useEffect(() => {
        getcategories();
    }, [category])

    const handleMouseEnterAndLeave = (event, index) => {
        const filterbarAllItems = document.querySelectorAll('.filterbar-items');
        if (event.type === "mouseenter") {
            // here all dropdown is hide 
            filterbarAllItems.forEach((item) => {
                const filterbarDropdownDiv = item.querySelector('.filterbar-item-dropdown');
                filterbarDropdownDiv ? filterbarDropdownDiv.style.display = "none" : "";
            });
            //here specific index div is shown
            const filterbarDropdownDiv = filterbarAllItems[index].querySelector('.filterbar-item-dropdown');
            filterbarDropdownDiv.style.display = "block";
        }

        if (event.type === "mouseleave") {
            // Get references to the child divs using class names
            const filterbarDropdownDiv = filterbarAllItems[index].querySelector('.filterbar-item-dropdown');
            filterbarDropdownDiv.style.display = "none";
        }
    };

    return (
        <div id="filterbar-maindiv">
            <div id="fileterbar-subdiv1">

                <div id="filterbar-filterbytext-item" className='filterbar-items'>
                    <div className="filterbar-items-firstdiv">
                        <p>FIlter By</p>
                    </div>
                </div>

                <div id="filterbar-pricediv" className='filterbar-items'  >
                    {/* // this to div is veritcal */}
                    <div className="filterbar-items-firstdiv" onMouseEnter={(event) => handleMouseEnterAndLeave(event, 1)}>
                        {/* // inside this horizontal */}
                        <p>Price</p>
                        <i className="ri-arrow-up-s-line"></i>
                    </div>

                    <div className="filterbar-item-dropdown" onMouseLeave={(event) => handleMouseEnterAndLeave(event, 1)}>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>under 3000</label>
                        </div>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>3k to 5k</label>
                        </div>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>5k to 10k</label>
                        </div>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>more than 10k </label>
                        </div>

                    </div>
                </div>


                <div id='filterbar-jwellerydiv' className='filterbar-items'>

                    <div className="filterbar-items-firstdiv" onMouseEnter={(event) => handleMouseEnterAndLeave(event, 2)}>
                        <p>Subcategory</p>
                        <i className="ri-arrow-up-s-line"></i>
                    </div>

                    <div className="filterbar-item-dropdown" onMouseLeave={(event) => handleMouseEnterAndLeave(event, 2)}>
                        {subcategory.map((subcategoryname) => {
                            return <div key={subcategoryname} className="filterbar-price-item-dropdown-content">
                                <input type='checkbox' id={subcategoryname} onChange={handleSubCategory_CheckboxOnChange} ></input>
                                <label>{subcategoryname}</label>
                            </div>
                        })}

                    </div>

                </div>


                {/* <div id="filterbar-genderdiv" className='filterbar-items'>
                    <div className="filterbar-items-firstdiv" onMouseEnter={(event) => handleMouseEnterAndLeave(event, 3)}>
                        <p>Gender</p>
                        <i className="ri-arrow-up-s-line"></i>
                    </div>
                    <div className="filterbar-item-dropdown" onMouseLeave={(event) => handleMouseEnterAndLeave(event, 3)}>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>Male</label>
                        </div>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>Female</label>
                        </div>
                    </div>
                </div> */}

                {/* <div id="filterbar-metal-div" className='filterbar-items'>
                    <div className="filterbar-items-firstdiv" onMouseEnter={(event) => handleMouseEnterAndLeave(event, 3)}>
                        <p>Metal</p>
                        <i className="ri-arrow-up-s-line"></i>
                    </div>
                    <div className="filterbar-item-dropdown" onMouseLeave={(event) => handleMouseEnterAndLeave(event, 3)}>

                        {metal.map((metalname) => {
                            return <div key={metalname} className="filterbar-price-item-dropdown-content">
                                <input type='checkbox'></input>
                                <label>{metalname}</label>
                            </div>
                        })}
                    </div>
                </div> */}

                {/* <div id="filterbar-metaldiv" className='filterbar-items'>
                    <div className="filterbar-items-firstdiv" onMouseEnter={(event) => handleMouseEnterAndLeave(event, 4)}>
                        <p>Tag</p>
                        <i className="ri-arrow-up-s-line"></i>
                    </div>

                    <div className="filterbar-item-dropdown" onMouseLeave={(event) => handleMouseEnterAndLeave(event, 4)}>
                        {tags.map((tagname) => {

                            return <div key={tagname} className="filterbar-price-item-dropdown-content">
                                <input type='checkbox' id={tagname} onChange={handleTag_CheckboxOnChange}></input>
                                <label>{tagname}</label>
                            </div>
                        })}
                    </div>
                </div> */}
            </div>

            <div id="fileterbar-subdiv2">

                <div id="filterbar-sortbytext-item" className='filterbar-items'>
                    <div className="filterbar-items-firstdiv">
                        <p>Sort By</p>
                    </div>
                </div>

                <div id='filterbar-sortby-item' className='filterbar-items'>


                    <div className="filterbar-items-firstdiv">
                        <p>knjnjn By</p>
                        <i className="ri-arrow-up-s-line"></i>
                    </div>
                    <div className="filterbar-item-dropdown">
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>Male</label>
                        </div>
                        <div className="filterbar-price-item-dropdown-content">
                            <input type='checkbox'></input>
                            <label>Female</label>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
