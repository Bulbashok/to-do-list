import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Form from "./components/Form";
import Item from "./components/Item";

const init = [
  { state: true, text: "помыть маму" },
  { state: false, text: "сварить кашу" },
];

type Data = { state: boolean; text: string }[];

const getData = () =>
  new Promise<Data>((res) => {
    setTimeout(() => {
      res(init);
    }, 2000);
  });

function App() {
  const [loading, setLoading] = useState(false);
  const [toDoListData, setToDoListData] = useState<Data>(
    []
  );
  const [isOpen, setOpen] = useState(false);

  const addElement = (value: string) => {
    if (!value) return;

    const newItem = { state: false, text: value };
    setToDoListData([...toDoListData, newItem]);
  };

  const onComplete = (index: number) => {
    const dataIndex = toDoListData[index];
    dataIndex.state = !dataIndex.state;

    setToDoListData([...toDoListData]);
  };

  const onChange = () => {};

  const getAsyncData = async () => {
    setLoading(true);
    try {
      const data = await getData();
      setToDoListData(data);
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setLoading(true);
    // getData()
    //   .then((data) => {
    //     setToDoListData(data);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    getAsyncData();
  }, []);

  return (
    <>
      <div>
        <h1>To-do-List</h1>
        <Form onSubmit={addElement} />
        <p></p>
        <button onClick={() => setOpen(true)}>open</button>
        {loading && "Loading..."}
        {toDoListData.map((todo, i) => {
          return (
            <Item
              text={todo.text}
              checked={todo.state}
              onComplete={() => onComplete(i)}
              onChange={() => onChange()}
            />
          );
        })}
      </div>
      <Modal isOpen={isOpen} close={() => setOpen(false)} />
    </>
  );
}

export default App;
