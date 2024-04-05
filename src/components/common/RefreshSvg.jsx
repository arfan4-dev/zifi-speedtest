import React from 'react'

const RefreshSvg = () => {
    const handleRefresh = () => {
        // Perform any action you want on refresh, for example, reloading the page
        window.location.reload();
    };
    return <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17.99 17.99"
        className='w-[7px] sm:w-[10px] 2xl:w-[18px] cursor-pointer hover:opacity-100'
        onClick={handleRefresh}
    >
        <defs>
            <style
                dangerouslySetInnerHTML={{
                    __html: "\n      .cls-1 {\n        fill: #fff;\n      }\n    "
                }}
            />
        </defs>
        <g id="Group_8586" data-name="Group 8586">
            <path
                id="Path_37351"
                data-name="Path 37351"
                className="cls-1"
                d="M12.55,5.64c0,.35,.28,.63,.63,.63h3.68c.62,0,1.13-.51,1.13-1.13V1.45c0-.35-.28-.63-.63-.63s-.63,.28-.63,.63v2.96C14.2,.14,8.68-1.27,4.41,1.26,.14,3.79-1.27,9.31,1.26,13.58s8.05,5.68,12.32,3.15c2.32-1.38,3.9-3.72,4.31-6.39,.06-.34-.17-.67-.52-.72-.34-.06-.67,.17-.72,.52,0,0,0,.01,0,.02-.63,4.24-4.58,7.16-8.82,6.53C3.58,16.05,.66,12.1,1.3,7.86,1.93,3.62,5.88,.7,10.12,1.33c2.29,.34,4.31,1.69,5.51,3.68h-2.45c-.35,0-.63,.28-.63,.63"
            />
        </g>
    </svg>
}

export default RefreshSvg