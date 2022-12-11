export default function initDefaultReducer(actionName: string, action: DefaultAction<RequestDataType>, state: DefaultState): DefaultState {

    switch (action.type) {
        case actionName + "_PROGRESS": {
            return {
                ...state,
                isFetching: true,
                isFailed: false,
                isSuccess: false,
            };
        }

        case actionName + "_SUCCESS": {
            // const { data, message, status } = action.payload;
            const {message, status} = action.payload
            
            return {
                ...state,
                isFetching: false,
                isFailed: false,
                isSuccess: true,
                data: action.payload,
                message,
                status
            };
        }

        case actionName + "_FAILURE": {
            if (action.payload) {
                const { data, message, status } = action.payload;

                return {
                    ...state,
                    isFetching: false,
                    isFailed: true,
                    isSuccess: false,
                    data: data || null,
                    message: message || "Unable to process request",
                    status
                };
            }
            else {
                return {
                    ...state,
                    isFetching: false,
                    isFailed: true,
                    isSuccess: false,
                    data: null,
                    message: "Unable to process request",
                    status: false
                }
            }
        }

        default: {
            return state;
        }
    }
};