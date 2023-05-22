import * as React from 'react';

import Slider from '@mui/material/Slider';

import img2 from '../../assets/images/share.png'
import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
const Customize = () => {
    const [value, setValue] = React.useState(0);
    const [value1, setValue1] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [value3, setValue3] = React.useState(30);
    const [pad, setPad] = React.useState(0)
    const [shadow, setShadow] = React.useState(2)
    const [rad, setRad] = React.useState(0)
    const [ins, setIns] = React.useState(10)
    const handleSliderChange = (event, newValue) => {
        setPad(newValue)
        setValue(newValue);
    };
    const handleSliderRad = (event, newValue) => {
        setRad(newValue)
        setValue1(newValue);
    };
    const handleSliderIns = (event, newValue) => {
        setIns(newValue)
        setValue2(newValue);
    };
    const handleSliderShadow = (event, newValue) => {
        setShadow(newValue)
        setValue3(newValue);
    };
    const [back, setBack] = React.useState("linear-gradient(45deg, rgb(253, 239, 132) , rgb(247, 198, 169), rgb(21, 186, 196))")
   
  
    const [switchValue, setSwitchValue] = React.useState(false);

    const handleSwitchChange = (event) => {
      setSwitchValue(event.target.checked);
    };


    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
        <div>
            <div className='container-sk pb-[150px]'>
                <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-6'>
                    <div class="w-full   p-6 mt-6 overflow-hidden">
                        <div class="feature2 flex items-center justify-center w-full h-full rounded-md  bg-[#1e293b]   pointer-events-none overflow-hidden" style={{ height: "500px" }}>
                            <div style={{
                                padding: `${pad}px`,
                                inset: `${ins}px`,
                                background: `${back}`
                            }} >
                                {switchValue && <div class="relative flex items-center" style={{height: '38px', background: 'rgba(255, 255, 255, 0.75)', paddingLeft: '1rem'}}>
                                    <svg width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height: '38px'}}>
                                        <path d="M6 24.75C9.17564 24.75 11.75 22.1756 11.75 19C11.75 15.8244 9.17564 13.25 6 13.25C2.82436 13.25 0.25 15.8244 0.25 19C0.25 22.1756 2.82436 24.75 6 24.75Z" fill="#FF5F57" stroke="black" stroke-opacity="0.2" stroke-width="0.5"></path>
                                        <path d="M26 24.75C29.1756 24.75 31.75 22.1756 31.75 19C31.75 15.8244 29.1756 13.25 26 13.25C22.8244 13.25 20.25 15.8244 20.25 19C20.25 22.1756 22.8244 24.75 26 24.75Z" fill="#FEBC2E" stroke="black" stroke-opacity="0.2" stroke-width="0.5"></path>
                                        <path d="M46 24.75C49.1756 24.75 51.75 22.1756 51.75 19C51.75 15.8244 49.1756 13.25 46 13.25C42.8244 13.25 40.25 15.8244 40.25 19C40.25 22.1756 42.8244 24.75 46 24.75Z" fill="#28C840" stroke="black" stroke-opacity="0.2" stroke-width="0.5"></path>
                                    </svg>
                                </div>}
                                <img src={img2} alt="TinySnap example" style={{ maxWidth: "300px", borderRadius: `${rad}px`, inset: `${ins}px`, boxShadow: `3px -1px ${shadow}px -3px rgba(0,0,0,0.75)` }} />
                            </div>
                        </div>
                    </div>
                    <div>

                        <div className='mb-20'>
                            <h1 className='text-[48px] text-semibold'>
                                Customize in your way
                            </h1>
                            <p className='mt-[32px] text-[#94a3b8] text-[18px] mr-[40px] mb-[]'>
                                Use our magic that can turn your boring screenshots into beautiful graphics within a few clicks. Apply backgrounds, frame mockups, add shadows, and watermarks to make it impressive.
                            </p>
                        </div>
                        <div className=" items-center  ">
                            <div className=" rounded-full   animate-bounce flex"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity mx-1" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
</svg> This is demo</div>
                        </div>
                        <div>
                            <div className='grid grid-cols-2 gap-6'>

                                <div className=''>
                                    <p>Background</p>

                                    <button className='rounded-full mx-1 mt-2' onClick={() => setBack("linear-gradient(45deg, rgb(253, 239, 132) , rgb(247, 198, 169), rgb(21, 186, 196))")} style={{ width: "20px", height: "20px", background: "linear-gradient(45deg, rgb(253, 239, 132) , rgb(247, 198, 169), rgb(21, 186, 196))" }}>
                                    </button>

                                    <button className='rounded-full mx-1 mt-2' onClick={() => setBack("linear-gradient(to right, rgb(250, 112, 154) 0%, rgb(254, 225, 64) 100%)")} style={{ width: "20px", height: "20px", background: "  linear-gradient(to right, rgb(250, 112, 154) 0%, rgb(254, 225, 64) 100%)" }}>
                                    </button>

                                    <button className='rounded-full mx-1 mt-2' onClick={() => setBack("linear-gradient(rgb(42, 245, 152) 0%, rgb(0, 158, 253) 100%)")} style={{ width: "20px", height: "20px", background: "linear-gradient(rgb(42, 245, 152) 0%, rgb(0, 158, 253) 100%)" }}>
                                    </button>

                                    <button className='rounded-full mx-1 mt-2' onClick={() => setBack("linear-gradient(45deg, rgb(217, 244, 255), rgb(255, 143, 167), rgb(93, 104, 255))")} style={{ width: "20px", height: "20px", background: "linear-gradient(45deg, rgb(217, 244, 255), rgb(255, 143, 167), rgb(93, 104, 255))" }}>
                                    </button>

                                    <button className='rounded-full mx-1 mt-2' onClick={() => setBack("linear-gradient(to top, rgb(80, 204, 127) 0%, rgb(245, 209, 0) 100%)")} style={{ width: "20px", height: "20px", background: "linear-gradient(to top, rgb(80, 204, 127) 0%, rgb(245, 209, 0) 100%)" }}>
                                    </button>

                                    <button className='rounded-full mx-1 mt-2' onClick={() => setBack("radial-gradient(circle at 32% 106%, rgb(255, 225, 125) 0%, rgb(255, 205, 105) 10%, rgb(250, 145, 55) 28%, rgb(235, 65, 65) 42%, transparent 82%), linear-gradient(135deg, rgb(35, 75, 215) 12%, rgb(195, 60, 190) 58%)")} style={{ width: "20px", height: "20px", background: "radial-gradient(circle at 32% 106%, rgb(255, 225, 125) 0%, rgb(255, 205, 105) 10%, rgb(250, 145, 55) 28%, rgb(235, 65, 65) 42%, transparent 82%), linear-gradient(135deg, rgb(35, 75, 215) 12%, rgb(195, 60, 190) 58%)" }}>
                                    </button>

                                </div>
                                <div>
                                    <p>
                                        Frame mockup</p>
                                    <FormControlLabel
                                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked={switchValue} onChange={handleSwitchChange} />}

                                    />
                                </div>
                                <div className=''>
                                    <p>Padding</p>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                    />
                                </div>
                                <div className=''>
                                    <p>
                                        Inset</p>
                                    <Slider
                                        value={typeof value2 === 'number' ? value2 : 0}
                                        onChange={handleSliderIns}
                                        aria-labelledby="input-slider"
                                    />

                                </div>
                                <div className=''>
                                    <p>Border Radius</p>
                                    <Slider
                                        value={typeof value1 === 'number' ? value1 : 0}
                                        onChange={handleSliderRad}
                                        aria-labelledby="input-slider"
                                    />

                                </div>
                                <div className=''>
                                    <p>Shadow</p>
                                    <Slider
                                        value={typeof value3 === 'number' ? value3 : 0}
                                        onChange={handleSliderShadow}
                                        aria-labelledby="input-slider"
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default Customize;