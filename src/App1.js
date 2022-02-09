import { useEffect, useState } from "react";
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

const Keyboardkey = ({ play, sound }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === sound.keyCode) {
      play(sound.keyTrigger);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      className="drum-pad"
      key={sound.keyTrigger}
      onClick={() => play(sound.keyTrigger)}
    >
      {sound.keyTrigger}
      <audio className="clip" id={sound.keyTrigger} src={sound.url} />
    </button>
  );
};

const Keyboard = ({ play, soundGroup }) => {
  return soundGroup.map((sound) => Keyboardkey({ play, sound }));
};

export default function App() {
  const [soundGroup, setSoundGroup] = useState(bankOne);
  const [power, setPower] = useState(true);

  const play = (key) => {
    if (power) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.play();
    }
  };

  const handleBankChange = (e) => {
    if (power) {
      if (e.target.checked) {
        setSoundGroup(bankTwo);
      } else {
        setSoundGroup(bankOne);
      }
    }
  };

  console.log(power);

  const handlePowerChange = () => {
    setPower(!power);
  };

  return (
    <div id="drum-machine" className="App">
      <Keyboard play={play} soundGroup={soundGroup} />
      {power && (
        <label for="bank">
          <p>Bank</p>
          <input
            type="checkbox"
            id="bank"
            onClick={(e) => handleBankChange(e)}
          />
        </label>
      )}
      <label for="power">
        <p>Power</p>
      </label>
      <input type="checkbox" id="power" onClick={handlePowerChange} />
    </div>
  );
}
