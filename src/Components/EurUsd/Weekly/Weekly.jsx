import React, { Component } from "react";

// import "./App.css";

class Min5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duomenys: [],
      selectedCandle: ""
    };
  }

  showCandle(id, data, open, hight, low, close, e) {
    console.log(id, data, open, hight, low, close, e);
    this.setState({
      selectedCandle: (
        <p>
          {" "}
          data: {data}, open price: {open}, hight price: {hight}, low price:{" "}
          {low}, close price: {close}
        </p>
      )
    });
  }

  componentDidMount() {
    console.log(this.state.duomenys.length);
    fetch(
      "https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=3JM7MXP7AKYCXD45"
    )
      .then(r => r.json())
      .then(res => {
        this.setState({ duomenys: res });
      })
      .then(ress => {
        console.log(this.state.duomenys.length);
        // console.log(this.state.duomenys["Meta Data"]);
        // console.log(this.state.duomenys["Meta Data"]["1. Information"]);
      });
  }

  render() {
    // a = [];
    var chartHeight = 800; //grafiko aukštis
    if (this.state.duomenys.length === undefined) {
      var a = [];
      for (var index in this.state.duomenys["Time Series FX (Weekly)"]) {
        // a = a["Time Series (5min)"][index];
        // a.push(index);
        a.push([
          index,
          this.state.duomenys["Time Series FX (Weekly)"][index]["1. open"],
          this.state.duomenys["Time Series FX (Weekly)"][index]["2. high"],
          this.state.duomenys["Time Series FX (Weekly)"][index]["3. low"],
          this.state.duomenys["Time Series FX (Weekly)"][index]["4. close"]
        ]);

        // console.log(
        //   index,
        //   this.state.duomenys["Time Series FX (5min)"][index]["1. open"],
        //   this.state.duomenys["Time Series FX (5min)"][index]["2. high"],
        //   this.state.duomenys["Time Series FX (5min)"][index]["3. low"],
        //   this.state.duomenys["Time Series FX (5min)"][index]["4. close"]
        // );
      }
      a.reverse();
      let maxValueOfCandle = 0;
      let minValueOfCandle = a[0][3];
      for (let i = 0; i < a.length; i++) {
        if (a[i][2] > maxValueOfCandle) {
          maxValueOfCandle = a[i][2];
        }
        if (a[i][3] < minValueOfCandle) {
          minValueOfCandle = a[i][3];
        }
      }
      console.log(
        maxValueOfCandle,
        minValueOfCandle,
        maxValueOfCandle - minValueOfCandle
      );
      let spaceBetwenCandle = 3;
      for (let i = 0; i < a.length; i++) {
        //console.log(i);
        a[i].unshift(i);
        // a[i].push(i * 2); //nuo kairės x kordnatė
        a[i].push(i * 2 * spaceBetwenCandle);
        //magija ieškome nuo viršaus kiek
        //kiek yra žemiau grafiko MAX HIGHT???

        // 0 id,
        // 1  index,
        // 2  this.state.duomenys["Time Series FX (5min)"][index]["1. open"],
        // 3  this.state.duomenys["Time Series FX (5min)"][index]["2. high"],
        // 4 this.state.duomenys["Time Series FX (5min)"][index]["3. low"],
        // 5 this.state.duomenys["Time Series FX (5min)"][index]["4. close"]
        // 6 x nuo kairės

        //OPEN kordinatė
        //maxValueOfCandle - einamos žvakės OPEN
        let yOpen = maxValueOfCandle - a[i][2];
        //kiek procentų sudaro viso MAX ir MIN
        yOpen = (yOpen * 100) / (maxValueOfCandle - minValueOfCandle);
        //kiek tai sudaro pikselių grafike
        yOpen = (chartHeight * yOpen) / 100;

        //HIGHT koordinate
        let yHight = maxValueOfCandle - a[i][3];
        //kiek procentų sudaro viso MAX ir MIN
        yHight = (yHight * 100) / (maxValueOfCandle - minValueOfCandle);
        //kiek tai sudaro pikselių grafike
        yHight = (chartHeight * yHight) / 100;

        //LOW koordinate
        let yLow = maxValueOfCandle - a[i][4];
        //kiek procentų sudaro viso MAX ir MIN
        yLow = (yLow * 100) / (maxValueOfCandle - minValueOfCandle);
        //kiek tai sudaro pikselių grafike
        yLow = (chartHeight * yLow) / 100;

        //CLOSE koordinate
        let yClose = maxValueOfCandle - a[i][5];
        //kiek procentų sudaro viso MAX ir MIN
        yClose = (yClose * 100) / (maxValueOfCandle - minValueOfCandle);
        //kiek tai sudaro pikselių grafike
        yClose = (chartHeight * yClose) / 100;

        a[i].push(yOpen, yHight, yLow, yClose); //nuo viršaus y=0 + ?

        //zvakės kūno aukštis
      }
      console.log(a);
    }

    return (
      <div className="App">
        <header className="App-header">
          {this.state.duomenys.length !== 0 ? (
            <>
              <strong>
                {this.state.duomenys["Meta Data"]["1. Information"]} <br />
                {this.state.duomenys["Meta Data"]["4. Last Refreshed"]}
              </strong>
              <p>
                <strong>Symbolis:</strong>{" "}
                {this.state.duomenys["Meta Data"]["2. From Symbol"]}/
                {this.state.duomenys["Meta Data"]["3. To Symbol"]}{" "}
                <strong>Intervalas:</strong>{" "}
                {this.state.duomenys["Meta Data"]["5. Interval"]} <br />
                <strong> Output Size:</strong>{" "}
                {this.state.duomenys["Meta Data"]["6. Output Size"]}{" "}
                <strong>Time Zone:</strong>{" "}
                {this.state.duomenys["Meta Data"]["7. Time Zone"]}{" "}
              </p>
              {this.state.selectedCandle}
              <p>
                <svg width={a.length + a.length * 5 + 10} height={chartHeight}>
                  <rect width="100%" height="100%" fill="white" />
                  {a.map(data => {
                    let color = data[7] > data[10] ? "green" : "red";
                    return (
                      <g
                        onClick={e =>
                          this.showCandle(
                            data[0],
                            data[1],
                            data[2],
                            data[3],
                            data[4],
                            data[5],
                            e
                          )
                        }
                      >
                        <line
                          // onClick={e => this.showCandle(data[0], e)}
                          key={data[0]}
                          x1={data[6]}
                          y1={data[8]}
                          x2={data[6]}
                          y2={data[9]}
                          style={{ stroke: "rgb(255,0,0)", strokeWidth: "1" }}
                        />

                        <rect
                          // onClick={e => this.showCandle(data[0], e)}
                          x={data[6] - 2}
                          y={data[7] < data[10] ? data[7] : data[10]}
                          width={4}
                          height={Math.abs(data[7] - data[10])}
                          style={{
                            fill: color,
                            stroke: color,
                            strokeWidth: "1",
                            fillOpacity: "0.1",
                            strokeOpacity: "0.9"
                          }}
                        />
                        {/* <line
                        key={data[0] + 1}
                        x1={data[6]}
                        y1={data[7] + 10}
                        x2={data[6]}
                        y2={data[8] + 10}
                        style={{ stroke: "rgb(255,255,0)", strokeWidth: "1" }}
                      /> */}
                      </g>
                    );
                  })}
                </svg>
              </p>
              <>
                {a.map(data => (
                  <div key={data[0]}>
                    {data[0]}: Data: {data[1]}, Open:{data[2]}, High:{data[3]},
                    Low:
                    {data[4]}, Close:{data[5]},{data[6]},{data[7]},{data[8]},
                    {data[9]},{data[10]}
                  </div>
                ))}
              </>
            </>
          ) : null}
        </header>
      </div>
    );
  }
}

export default Min5;
