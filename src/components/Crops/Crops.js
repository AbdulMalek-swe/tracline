// import {   Slider  from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { generateDownload } from "./utils/cropImage";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {  Slider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
const Crops = (props) => {
	const [opens, setOpens] = React.useState(false);
	const handleOpens = () => setOpens(true);
	const handleCloses = () => setOpens(false);
	const [as, setAs] = useState(2 / 3)
	const handleIcon = async (e) => {
		await setOpens(true);
		await setAs(e)
	}
	// const inputRef = React.useRef();

	// const triggerFileSelectPopup = () => inputRef.current.click();

	// const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

 
	const onDownload = () => {
		generateDownload(props.input, croppedArea);
	};

	return (
		<div className='container-s'>
			<div className='flex  items-center'>

				<div className='mb-11 text-[22px]'>
					Create a new design
				</div>
			</div>
			<div className='flex flex-wrap  jutify-center items-center'>

				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(3 / 2)}> <DownloadIcon /> Business Card</Button>
				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(4 / 5)}> <DownloadIcon />Instagram Post</Button>
				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(4 / 1)}> <DownloadIcon />Email Signature</Button>
				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(9 / 16)}> <DownloadIcon />Instagram Story</Button>
				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(16 / 9)}> <DownloadIcon />Facebook Cover</Button>
				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(1.91 / 1)}> <DownloadIcon />Facebook Post</Button>
				<Button variant="outlined" className="w-[170px] text-white hover:bg-gray-700 mx-1 my-1 capitalize" onClick={() => handleIcon(1 / 1)}> <DownloadIcon />letterhead</Button>
			</div>
			<Modal
				open={opens}
				onClose={handleCloses}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className='fixed top-0 '
			>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:h-[40vw]  h-[75vh] bg-gray-700 rounded-lg pb-5'>

					<div className='container-cropper'>
						<>
							<div className='cropper'>
								<Cropper
									image={props.input}
									crop={crop}
									zoom={zoom}
									aspect={as}
									onCropChange={setCrop}
									onZoomChange={setZoom}
									onCropComplete={onCropComplete}
								/>
							</div>

							<div className='text-center flex justify-center mt-0 mb-0'>
								<div className='slider w-1/2 mt-0 mb-0'>
									<Slider
										min={1}
										max={3}
										step={0.1}
										value={zoom}
										onChange={(e, zoom) => setZoom(zoom)}
									/>
								</div>
							</div>
						</>

					</div>

					<div className='container-buttons'>
						 
						<Button onClick={onDownload} className='absolute bottom-0   w-full mb-4 flex justify-center items-center hover:bg-transparent '>
							<span className='text-center flex justify-center items-center'>
								<span className='hover:bg-red-700 p-3 rounded-lg bg-black'>Download</span>
							</span>
						</Button>
						
					</div>
					<Button onClick={handleCloses} className='absolute top-[-22px] right-[-32px]    '>
							<span className=' '>
								<span className='hover:bg-red-700 bg-blue-700 p-2  rounded-full bg-black py-3'><CloseIcon/> </span>
							</span>
						</Button>
				</div>
				 
			</Modal>
		</div>
	);
};

export default Crops;