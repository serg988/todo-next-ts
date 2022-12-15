// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  PATCH?: Function
  DELETE?: Function
}

// Interface to define our Todo model on the frontend
export interface TodoType {
  _id?: number
  item: string
  completed: boolean
}
