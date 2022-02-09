import { useEffect, useState } from "react";
import ReactFCCTest from "react-fcctest";
import "./styles.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
};

const Keyboardkey = ({ play, sound }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === sound.keyCode) {
      console.log(sound.keyTrigger, sound.id, sound.url);
      play(sound.keyTrigger, sound.id);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      id={sound.id}
      className="drum-pad"
      key={sound.keyTrigger}
      onClick={() => play(sound.keyTrigger, sound.id)}
    >
      {sound.keyTrigger}
      <audio className="clip" id={sound.keyTrigger} src={sound.url} />
    </button>
  );
};

const Keyboard = ({ play, soundGroup }) => (
  <div className="keyboard">
    {soundGroup.map((sound) => (
      <Keyboardkey play={play} sound={sound} />
    ))}
  </div>
);

const DrumControl = ({ volume, handleVolumeChange, changeBank, name }) => {
  return (
    <div className="control">
      <input
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
      />
      <h1 id="display"> {name} </h1>
      <button onClick={() => changeBank()}> Bank </button>
    </div>
  );
};

export default function App() {
  const [volume, setVolume] = useState(0.5);
  const [soundType, setSoundType] = useState("heaterKit");
  const [soundGroup, setSoundGroup] = useState(soundsGroup[soundType]);
  const [soundName, setSoundName] = useState("");
  const [power, setPower] = useState(true);

  const play = (key, id) => {
    //if (power) {
    setSoundName(id);
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    //}
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.volume);
  };

  const changeBank = () => {
    setSoundName("");
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit");
      setSoundGroup(soundsGroup.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSoundGroup(soundsGroup.heaterKit);
    }
  };

  const setKeyVolume = () => {
    const audios = soundGroup.map((sound) =>
      document.getElementById(sound.key)
    );
    audios.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  return (
    <>
      <ReactFCCTest />
      <div id="drum-machine" className="App">
        {setKeyVolume()}
        <div className="wrapper">
          <Keyboard play={play} soundGroup={soundGroup} />
          <DrumControl
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            changeBank={changeBank}
            name={soundName || soundsName[soundType]}
          />
        </div>
      </div>
    </>
  );
}
