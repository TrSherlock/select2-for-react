import { useState,useRef,useEffect } from "react";
import "./select2.css";
function Select2({ data, width, value, keyValue, keyLabel, update }) {
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            // console.log(selectRef);
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
    const [find, setFind] = useState("");

    const selectOpen = i => {
        const mainBox = i.target.closest(".select2.select2-container");
        const mainBoxSearch = mainBox.querySelector("input.select2-search__field");
        const mainBoxUl = mainBox.querySelector("ul");
        mainBox.classList.toggle("select2-container--open")
        mainBoxSearch.focus();
        if (index !== -1) {
            mainBoxUl.scrollTop = mainBoxUl?.childNodes[index]?.offsetTop - 120
        } else if(value === ""){
            setIndex(-1);
            mainBoxUl.scrollTop = 0;
            // setSelect([...data]);
        }
    }

    const selectClick = (item, i) => {
        const mainBox = item.target.closest(".select2.select2-container");
        update({
            keyLabel: keyLabel,
            keyValue: keyValue,
            item: select[i],
            value: select[i][keyValue]
        });
        mainBox.classList.remove("select2-container--open");
        // setIndex(i);
        // const findIndex = data.findIndex((f) => f.Kod === value)
        setIndex(i);
        setSelect([...data]);
        setFind("")
    }

    const findSelect = i => {
        setFind(i.target.value);
        let updateIndex = index;
        const mainBox = i.target.closest(".select2.select2-container");
        const mainBoxUl = mainBox.querySelector("ul");
        console.log(mainBoxUl.childNodes.length);
        if (i.target.value === "") {
            // setIndex(data.findIndex(f => f.Kod === value));
            updateIndex = (value === "") ? 0 : data.findIndex(f => f.Kod === value);
            setIndex(updateIndex);
            setSelect([...data]);
        } else {
            const filterData = select.filter(f => f[keyLabel].toLocaleUpperCase().includes(i.target.value.toLocaleUpperCase()))
            setSelect([...filterData]);

            updateIndex = filterData.findIndex(f => f.Kod === value);
            // console.log(updateIndex, select);
            if (updateIndex === -1) {
                setIndex(0);

            } else {
                setIndex(updateIndex);
            }
            setSelect([...filterData])
        }
        if (mainBoxUl.childNodes.length !== 0) {
            mainBoxUl.scrollTop = mainBoxUl?.childNodes?.[updateIndex]?.offsetTop - 120
        }
    }

    const upDown = (i, what) => {
        const lastIndex = select.lastIndexOf(select.at(-1));
        let updateIndex = index;
        const mainBox = i.target.closest(".select2.select2-container");
        const mainBoxUl = mainBox.querySelector("ul");
        
        switch (i.keyCode) {
            case 8:
                if(what === "up"){
                    // console.log(eval("10e5"));
                }
                break;
            case 27:
                mainBox.classList.remove("select2-container--open");
                break;
            case 13:
                update({
                    keyLabel: keyLabel,
                    keyValue: keyValue,
                    item: select[index],
                    value: select[index][keyValue]
                })
                mainBox.classList.remove("select2-container--open");
                break;
            case 38:
                if(what === "down"){
                    // console.log(eval("10e5"));
                    i.preventDefault();
                    updateIndex = (updateIndex === 0) ? lastIndex : index - 1
                    setIndex(updateIndex);
                    console.log({
                        index: index,
                        updateIndex: updateIndex
                    });
                }
                break;
            case 40:
                if(what === "up"){
                    // console.log(eval("10e5"));
                    i.preventDefault();
                    updateIndex = (index === lastIndex) ? 0 : index + 1
                    setIndex(updateIndex);
                }
                break;
            default:
                break;
        }
        
        if (what === "up" && mainBoxUl.childNodes.length !== 0) {
            mainBoxUl.scrollTop = mainBoxUl?.childNodes[updateIndex]?.offsetTop - 120
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
                                onKeyDown={(keyDown)=>{upDown(keyDown, "down")}}
                                onKeyUp={(keyUp)=>{upDown(keyUp, "up")}}
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
                                            onClick={(item) => { selectClick(item, i) }}
                                            className={"select2-results__option hover:bg-violet-300 " + ((i === index) ? "select2-results__option--highlighted" : "")}
                                            data-selected={(i === index) ? "true" : ""}
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
