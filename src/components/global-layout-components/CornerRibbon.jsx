const CornerRibbon = () => {

  const ribbonText = {
    backgroundColor: "#a00",
    width: "80%",
    boxShadow: "0 0 10px #888",
    border: "1px solid #faa",
    color: "#fff",
    display: "block",
    position: "absolute",
    transform: " translateX(35%) rotate(45deg)",
    top: "5%",
    right: "5%",
    zIndex: "10",
    padding: "1px 5px",
    textAlign: "center",
    textDecoration: "none",
    textShadow: "0 0 5px #444",
  };

  return <p style={ribbonText} className="text-sm">50% OFF!</p>;
};

export default CornerRibbon;
