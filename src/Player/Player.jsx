import React, { useRef } from "react";
import "./player.scss";
import { BsPlay } from "react-icons/bs";
import { AiOutlinePause } from "react-icons/ai";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <div className="player_container">
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div
            className="seek_bar"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row justify-between  w-full">
        <div className="flex flex-row">
          <img
            src="https://media.licdn.com/dms/image/D4E0BAQG-i2j7Q2WFIA/company-logo_200_200/0/1694593111703/img_logo?e=2147483647&v=beta&t=GXoH1LXt9jy32BZy9mCLWxerKUmdGB6xCQStyv7hi34"
            height={50}
            width={50}
          />

          <div className="mt-3 ml-2">
            <p>{currentSong.title}</p>
          </div>
        </div>

        <div className="controls">
          <MdOutlineSkipPrevious className="btn_action" onClick={skipBack} />
          {isplaying ? (
            <AiOutlinePause className="btn_action pp" onClick={PlayPause} />
          ) : (
            <BsPlay className="btn_action pp" onClick={PlayPause} />
          )}
          <MdOutlineSkipNext className="btn_action" onClick={skiptoNext} />
        </div>
      </div>
    </div>
  );
};

export default Player;
