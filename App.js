import { useState } from 'react';
import SelectIndex from './selectIndex';
import data from "./data.json";


function App() {
  const handleChange = ({item, keyLabel, keyValue, value}, span) => {
    switch (span) {
      case 1:
        setSpan1({
          value: item.Kod,
          label: item.Aciklama
        })
        break;
      case 2:
          setSpan2({
            value: item[keyValue],
            label: item[keyLabel]
          })
          setSpan3({
            value: item[keyValue],
            label: item[keyLabel]
          })
      break;
      default:
        break;
    }
  }

  const [span1, setSpan1] = useState({
    value: "600.N472401.01.01",
    label: ""
  })
  const [span2, setSpan2] = useState({
    value: "600.F999999.18.02",
    label: ""
  })
  const [span3, setSpan3] = useState({
    value: "600.F999999.18.02",
    label: ""
  })
  // const [value, setValue] = useState("600.N561019.01.01")
  return (
    <>
      <span>
        {`Span1=> ${span1.value} - ${span1.label}`}
      </span>
      <br />
      <span>
        {`Span2=> ${span2.value} - ${span2.label}`}
      </span>
      <br />
      <span>
        {`Span3=> ${span3.value} - ${span3.label}`}
      </span>
      <hr/>
      <SelectIndex data={data}
        update={(s1)=>{handleChange(s1, 1)}}
        value={span1.value}
        keyLabel="Aciklama"
        keyValue="Kod"
        width="300px"
      />
      <SelectIndex data={data}
        update={(s1)=>{handleChange(s1, 2)}}
        value=""
        keyLabel="Aciklama"
        keyValue="Kod"
        width="300px"
      />
      <hr />
      <iframe width="768" height="432" src="https://www.youtube.com/embed/86IxCGKUOzY" title="月詠み『生きるよすが』Music Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </>
  );
}

export default App;
