import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#dfe4fb"
        foregroundColor="#ecebeb"
        {...props}
    >

    </ContentLoader>
)

export default MyLoader