import React from "react";

export const AppContext = React.createContext({

    alert: {
        header: "Внимание",
        content: "",
        button: "Хорошо",
        onClose: (props) => {},
        display: false
    },
});
