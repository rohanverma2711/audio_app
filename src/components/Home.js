import React, { useState, useEffect, useRef } from "react";
import { Resources } from "../Resources/index";
import Pagination from "react-js-pagination";
import { songsdata } from "../Player/audios";
import "../style.css";
import Player from "../Player/Player";
import Modal from "./Modal";
import "../Modal.css";
import { useNavigate } from "react-router-dom";

function Home() {
  //songs

  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying, currentSong]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  //home page
  const itemsPerPage = 4;
  const [activePage, setActivePage] = useState(1);
  const getDataForPage = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return songsdata.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  //modal

  function addSong(newSong) {
    const newSongId = songs.length + 1;

    const songToAdd = {
      id: newSongId,
      ...newSong,
    };

    songs.push(songToAdd);

    return songs;
  }

  const handleAddSong = (newSong) => {
    const updatedSongs = addSong(newSong);

    setSongs(updatedSongs);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-full h-full   flex flex-row bg-admin-whiteSmokeLight ">
        <div className="lg:w-1/6  border-1 border-grey    text-white rounded-xxlg hidden md:block">
          <div className=" flex flex-col justify-between  h-full ">
            <div className="justify-start">
              <div className="font-montse  pt-5  h-24 text-4xl font-extrabold py-2  text-center text-darkPurple">
                Logo
              </div>

              <div class=" ml-2 flex flex-row   justify-between font-montse h-10 my-7  text-start text-resolutionBlue  bg-backBlue">
                <div className="flex flex-row">
                  <img className="pr-4 " src={Resources.images.menu}></img>
                  <p className="mt-2">Songs</p>
                </div>
                <div className="w-1 h-10 bg-sideBlue "></div>
              </div>
            </div>

            <div className=" ml-3  justify-end  lg:h-68 ">
              <div
                class="font-montse  my-7  flex flex-row text-resolutionBlue cursor-pointer"
                onClick={() => navigate("/")}
              >
                {" "}
                <img className="pr-4" src={Resources.images.logout}></img>
                LogOut
              </div>
            </div>
          </div>
        </div>

        <div className=" w-5/6   ">
          <div className="   h-full ">
            <div className="ml-5 mt-3">
              <span className="text-grey">First Level Menu </span>{" "}
              <span className="text-grey">/</span>
              <span className="text-grey"> Second Level Menu </span>{" "}
              <span className="text-grey">/</span>
              <span>Current Page </span>
            </div>
            <div className="flex flex-row justify-between mx-5">
              <div className="justify-start">
                <div class=" flex flex-col   justify-between font-montse h-10 my-4  text-start text-black  ">
                  <p className="mt-2 text-xl font-medium ">Songs</p>
                </div>
              </div>

              <div className="  justify-end  lg:h-68 ">
                <div class="font-montse  my-4  px-4 py-2 flex flex-row text-black bg-yellowHome">
                  <button onClick={openModal}>Add song</button>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="">
                <div className="  ">
                  <div className="overflow-hidden ">
                    <table className=" text-left text-sm font-light ">
                      <thead className="border-b font-medium dark:border-neutral-500  ">
                        <tr>
                          <th scope="col" className="pr-32 pl-14 py-4">
                            SONG NAME
                          </th>
                          <th scope="col" className="px-32 py-4">
                            SOURCE
                          </th>
                          <th scope="col" className="px-32 py-4">
                            ADDED ON
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDataForPage().map((data) => (
                          <tr
                            key={data.id}
                            className="border-b cursor-pointer transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 bg-white"
                          >
                            <td className="whitespace-nowrap pl-10 pr-32 py-4 font-large flex flex-row">
                              <img src={data.imgsrc} height={50} width={50} />
                              <p className="ml-3 mt-3">{data.title}</p>
                            </td>
                            <td className="whitespace-nowrap px-32 py-4">
                              {data.source}
                            </td>
                            <td className="whitespace-nowrap px-32 py-4">
                              {data.date}
                            </td>
                            <td className="whitespace-nowrap px-20 py-2">
                              <img
                                src={Resources.images.play}
                                height={200}
                                width={200}
                                onClick={() => {
                                  setCurrentSong(songs[data.id - 1]);
                                  setisplaying(true);
                                  audioElem.current.currentTime = 0;
                                }}
                              />
                            </td>
                            <td className="whitespace-nowrap  px-20 py-4">
                              <img
                                src={Resources.images.delete}
                                height={200}
                                width={200}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      <Pagination
                        size="lg"
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={songsdata.length}
                        pageRangeDisplayed={2}
                        onChange={handlePageChange}
                        itemClass="pagination-item"
                        linkClass="pagination-link"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="   flex justify-center">
              <audio
                src={currentSong.url}
                ref={audioElem}
                onTimeUpdate={onPlaying}
              />
              <Player
                songs={songs}
                setSongs={setSongs}
                isplaying={isplaying}
                setisplaying={setisplaying}
                audioElem={audioElem}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
              />
            </div>

            {isModalOpen && (
              <Modal onClose={closeModal} handleAddSong={handleAddSong}></Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
