import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [imageData, setImageData] = useState([]);

  async function fetchData() {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=moon`
    );
    console.log("data from server--", response.data.collection.items);
    let items = response?.data?.collection?.items;
    let temp = [];
    // items.map((item) => {
    //   // console.log("item array map", item);
    //   item.links &&
    //     item.links.map((itemInside) => {
    //       //console.log("itemInside", itemInside);
    //       if (itemInside.rel === "preview") {
    //         console.log("itemInside preview", itemInside);
    //         temp.push(itemInside.href);
    //         setImageData((prevItems) => {
    //           return [...prevItems, itemInside.href];
    //         });
    //       }
    //     });
    //   console.log("temp array", temp);
    // });
    //setImageData([...temp]);

    const testitem = items.reduce((accumulator, current) => {
      console.log("--current-->", current, "---end--");

      if (current["links"] !== undefined) {
        const temp = current?.links?.findIndex(({ rel }) => rel === "preview");
        const { href } = current?.links?.find(({ rel }) => rel === "preview");

        // console.log("index--", temp, current?.links[temp]?.href);
        // console.log("href value--", href);
        // console.log("accumulator value--", accumulator);
        //accumulator.push(current?.links[temp]?.href);
        return [...accumulator,href];
      }
      return accumulator;

      // if (temp >= 0) {
      //   return [...current?.links?[temp].['href']];
      // }
    }, []);
    console.log("final", testitem);
    setImageData(testitem);
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log("imageData", imageData.length);
  return (
    <div className="grid-container">
      {imageData.length > 0 &&
        imageData.map((imageItem) => {
          return (
            <img src={imageItem} alt="moon images" className="imgholder" />
          );
        })}
    </div>
  );
}

export default App;
