//GLOBALS
//An array that contains all the keys that you can press on the drum pad
const arrOfDrumPadKeys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
const soundBankOne = [
  {
    key: "Q",
    soundName: "Heater-1",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    soundName: "Heater-2",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    soundName: "Heater-3",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    soundName: "Heater-4",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    soundName: "Clap",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    soundName: "Open-HH",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    soundName: "Kick-n'-Hat",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    soundName: "Kick",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    soundName: "Closed-HH",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const soundBankTwo = [
  {
    key: "Q",
    soundName: "Chord-1",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    key: "W",
    soundName: "Chord-2",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    key: "E",
    soundName: "Chord-3",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    key: "A",
    soundName: "Shaker",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    key: "S",
    soundName: "Open-HH",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    key: "D",
    soundName: "Closed-HH",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    key: "Z",
    soundName: "Punchy-Kick",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    key: "X",
    soundName: "Side-Stick",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    key: "C",
    soundName: "Snare",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

//Add an event listener to the keydown event
$(document).keypress(async (e) => {
  //Only deliver a response if a drum pad key has been pressed
  if (arrOfDrumPadKeys.includes(e.key.toLowerCase())) {
    handleKeyPress(e.key);
  }
});

function handleKeyPress(key) {
  //If the power button is off return/terminate early
  if ($(".selector.power-selector").css("flex-direction") === "row") {
    return 1; //The error code for device not configured properly
  }
  //Play the sound that corresponds to that key
  playKeySound(key);
  //Press the tile
  pressKeyButton(key);
  //Change the display text to the sound the key is sounding
  changeDisplayTextToKeySound(key);
}

function playKeySound(key) {
  const audioElement = $(`#${key.toUpperCase()}`).get(0);
  audioElement.currentTime = 0;
  audioElement.play();
}

function pressKeyButton(key) {
  const drumKeyButton = $(`#${key.toUpperCase()}`).parent();
  drumKeyButton.css({
    background: "orange",
    width: "95%",
    height: "95%",
    "box-shadow": "0px 0px 3px black",
  });
  setTimeout(() => {
    drumKeyButton.css({
      background: "#808080",
      width: "100%",
      height: "100%",
      "box-shadow": "3px 3px 5px black",
    });
  }, 100);
}

function changeDisplayTextToKeySound(key) {
  //Get the name of the sound hit from the drum pad id
  const soundName = $(`#${key.toUpperCase()}`).parent().attr("id");
  //Display the sound name in the display
  $(`#display`).text(soundName);
}

function setUpSoundBank(soundBankNumber) {
  if (soundBankNumber == 1) {
    soundBankOne.forEach((element) => {
      //Set the audio src's of the audio tags within the drum pads
      $(`#${element.key}`).attr("src", element.soundUrl);
      //Set the id of the drum pads to their corresponding sound names
      $(`#${element.key}`).parent().attr("id", element.soundName);
    });
  } else if (soundBankNumber == 2) {
    soundBankTwo.forEach((element) => {
      //Set the audio src's of the audio tags within the drum pads
      $(`#${element.key}`).attr("src", element.soundUrl);
      //Set the id of the drum pads to their corresponding sound names
      $(`#${element.key}`).parent().attr("id", element.soundName);
    });
  }
}

function switchSoundBank() {
  //Determine what sound bank is currently playing
  console.log($(".selector.bank-selector").css("flex-direction"));
  if ($(".selector.bank-selector").css("flex-direction") === "row-reverse") {
    setUpSoundBank(2);
    setBankSwitch(2);
    //Display the name of of the sound bank you are switching to
    $(`#display`).text("Smooth Piano Kit");
  } else {
    setUpSoundBank(1);
    setBankSwitch(1);
    //Display the name of of the sound bank you are switching to
    $(`#display`).text("Heater Kit");
  }
}

function setBankSwitch(currentBankNumber) {
  if (currentBankNumber === 1) {
    $(".selector.bank-selector").css("flex-direction", "row-reverse");
  } else if (currentBankNumber === 2) {
    $(".selector.bank-selector").css("flex-direction", "row");
  }
}

function switchPower() {
  //Determine whether the power button is on or not using it's flex-direction
  //Then perform the appropriate flex-direction reversal to turn on/off the power button
  if ($(".selector.power-selector").css("flex-direction") == "row-reverse") {
    //The power button was on
    //Turn off the power button
    $(".selector.power-selector").css("flex-direction", "row");
  } else {
    //The power button was off
    //Turn on the power button
    $(".selector.power-selector").css("flex-direction", "row-reverse");
  }
}

function handleVolumeChange(e) {
  //Set the volume on all the audio elements
  $("audio").prop("volume", e.target.value);
  //Set the display to display the volume
  $("#display").text(`Volume: ${Math.floor(e.target.value * 100)}`);
  //Make the display clear after 1 second the volume changes
  setTimeout(() => $("#display").text(""), 1000);
}

function main() {
  //Adding the onClick event listeners to each button to handle the keypress
  arrOfDrumPadKeys.forEach((element) =>
    $(`#${element.toUpperCase()}`)
      .parent()
      .click(() => handleKeyPress(element))
  );
  //Add the initial volume to all audio elements
  $("audio").prop("volume", 0.61);
  //Add an event listener to the volume range selector that allows for a new volume to be set
  $("#volume").on("input", handleVolumeChange);
  //Set up the initial sound bank
  setUpSoundBank(1);
  //Add the ability to switch sound bank
  $(".selector.bank-selector").click(switchSoundBank);
  //Add the ability to power off the drum machine
  $(".selector.power-selector").click(switchPower);
}

main();
