import { Readable } from "stream";

const Locations = [
  {
    Latitude: 22.5,
    Longitude: 22.5,
  },
  {
    Latitude: 23.5,
    Longitude: 23.5,
  },
  {
    Latitude: 24.5,
    Longitude: 24.5,
  },
  {
    Latitude: 25.5,
    Longitude: 25.5,
  },
];
const generateNextLocation = (obj) => {
  return {
    Longitude: obj.Longitude + 0.000001,
    Latitude: obj.Latitude + 0.000001,
  };
};

class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true }); //encoding: 'UTF-8' => Converts buffer to string
    this.array = array;
    this.index = 0;
  }

  _read() {
    // setInterval(() => {
    //   let obj = generateNextLocation();
    //   Locations.push(obj);
    // }, 1000);
    if (this.index < this.array.length) {
      const chunk = {
        Latitude: this.array[this.index].Latitude,
        Longitude: this.array[this.index].Longitude,
        // index: this.index,
      };
      this.push(chunk);
      this.index += 1;
    } else this.push(null);
  }
}

const LocationStream = new StreamFromArray(Locations);

LocationStream.on("data", (chunk) => console.log(chunk));

LocationStream.on("end", () => console.log("done!"));
