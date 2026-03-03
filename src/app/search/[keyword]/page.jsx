
const page = async({params}) => {
    const {keyword} = await params
    const decodedURI = decodeURIComponent(keyword)
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/search/${encodeURIComponent(
      decodedURI
    )}`)
    return (
        <div>
            {decodedURI}
        </div>
    );
};

export default page;