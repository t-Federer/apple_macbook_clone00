function App() {
        return (
                <div>
                        <h1>Test asset from local-assets</h1>
                        <p>Is the image showing up?</p>
                        <img
                                src="/local-assets/battery.png"
                                alt="Test"
                                style={{ width: "100px", borderRadius: "8px", marginTop: "1rem" }}
                        />
                </div>
        )
}

export default App