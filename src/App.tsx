import React from 'react';


const Index = React.lazy(() => import("./features"))

function App() {
    // WebApp.initDataUnsafe.user?.id


    return (
        <Index/>
    );
}

export default App;
