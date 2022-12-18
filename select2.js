import { useState,useRef,useEffect } from "react";
import "./select4.css";
function Select2({ data, width, value, keyValue, keyLabel, update }) {
    const selectRef = useRef(null);
    
    useEffect(() => {
      const handleClick = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          selectRef.current.classList.remove("select2-container--open");
        }
      };
    
      document.addEventListener("click", handleClick);
    
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, []);

    const [index, setIndex] = useState(data.findIndex(f => f.Kod === value));
    const [select, setSelect] = useState([...data]);
    const [find, setFind] = useState("")
    const selectOpen = i => {
        const mainBox = i.target.closest(".select2.select2-container");
        const mainBoxSearch = mainBox.querySelector("input.select2-search__field");
        const mainBoxUl = mainBox.querySelector("ul");
        mainBox.classList.toggle("select2-container--open")
        mainBoxSearch.focus();
        if(index !== -1){
            mainBoxUl.scrollTop = mainBoxUl.childNodes[index].offsetTop - 120
        }
    }
    const findSelect = i => {
        setFind(i.target.value);
        let updateIndex = index;
        const mainBox = i.target.closest(".select2.select2-container");
        const mainBoxUl = mainBox.querySelector("ul");
        if(i.target.value === ""){
            setSelect([...data]);
            setIndex(data.findIndex(f => f.Kod === value));
            (value === "") ? setIndex(0): setIndex(data.findIndex(f => f.Kod === value));
        } else {
            setSelect(data.filter(f => f[keyLabel].toLocaleUpperCase().includes(i.target.value.toLocaleUpperCase())))
            setIndex(0);
        }
        if(mainBoxUl.childNodes.length !== 0){
            mainBoxUl.scrollTop = mainBoxUl.childNodes[updateIndex].offsetTop - 120
        }
    }

    const upDown = (i) => {
        const lastIndex = select.lastIndexOf(select.at(-1));
        let updateIndex = index;
        const mainBox = i.target.closest(".select2.select2-container");
        const mainBoxUl = mainBox.querySelector("ul");
        switch (i.keyCode) {
            case 27:
                console.log("Esc");
                break;
            case 13:
                update({
                    keyLabel: keyLabel,
                    keyValue: keyValue,
                    item: select[index]
                })
            break;
            case 38:
                i.preventDefault();
                updateIndex = (updateIndex === 0) ? lastIndex: index - 1
                setIndex(updateIndex);
                console.log({
                    index: index,
                    updateIndex: updateIndex
                });
            break;
            case 40:
                i.preventDefault();
                updateIndex = (index === lastIndex) ? 0: index + 1
                setIndex(updateIndex);
            break;
            default:
            break;
        }
        
        if(mainBoxUl.childNodes.length !== 0){
            mainBoxUl.scrollTop = mainBoxUl.childNodes[updateIndex].offsetTop - 120
        }
    }

    return (
        <>
            <div
                ref={selectRef}
                style={{ "width": width }}
                className="select2 select2-container select2-container--default select2-container--classic select2-container--below select2-container--focus">
                <div className="selection" onClick={selectOpen}>
                    <div className="select2-selection select2-selection--single">
                        <span className="select2-selection__rendered" title="California">{value}</span>
                        <span className="select2-selection__arrow"><b></b></span>
                    </div>
                </div>
                <div className="select2-container select2-container--default select-container--open select2-container-dropdown">
                    <div className="select2-dropdown select2-dropdown--below">
                        <div className="select2-search select2-search--dropdown">
                            <input
                                value={find}
                                // onKeyDown={(item) => { upDown(item, "down") }}
                                onChange={findSelect}
                                onKeyDown={upDown}
                                className="select2-search__field" type="search"
                                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                            />
                        </div>
                        <div className="select2-results">
                            <ul className="select2-results__options" tabIndex="-1">
                                {
                                    select.map((e, i) => (
                                        <li key={i}
                                            value={value}
                                            className={"select2-results__option hover:bg-violet-300 " + ((i === index) ? "select2-results__option--highlighted" : "")}
                                            data-selected={(i===index) ? "true": ""}
                                            data-disabled="false"
                                        >{e[keyLabel]}</li>
                                    ))
                                }
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Select2
