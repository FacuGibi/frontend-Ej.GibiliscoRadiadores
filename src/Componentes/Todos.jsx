import "../Components.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Compras from "./Compras";
import Stock from "./Stock";
import Ventas from "./Ventas";

export default function Todos(props) {
  const [radiadores, setRadiadores] = useState()

  useEffect(() => {
    axios.get(props.baseUrl + "/radiadores").then((response) => {
      setRadiadores(response.data);
    });
  }, [props.baseUrl, radiadores]);

  return (
    <div class="row">
      <div class="col">
        <Compras />
      </div>
      <div class="col">
        <Ventas radiadores={radiadores} baseUrl={props.baseUrl} />
      </div>
      <div class="col">
        <Stock />
      </div>
    </div>
  );
}
