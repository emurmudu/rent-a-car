import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";




const createCar = catchAsync(async(req, res) =>{
    const result = await CarServices.createCarIntoDB(req.body);
   
    sendResponse(res, {
        statusCode: httpStatus.CREATED, 
        success:true, 
        message: 'Car created successfully', 
        data: result,})
});



const getAllCars = catchAsync(async(req, res) =>{
    const result = await CarServices.getAllAcarsFromDB();
    

    result.length < 1
    ? sendResponse(res, {
        success: true,
        statusCode: httpStatus.NOT_FOUND,
        message: "No Data Found",
        // data: result,
        data: [],
      })
    : sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars retrieved successfully',
        data: result,
    })
})



const getSingleCar = catchAsync(async(req, res) =>{
    const {id} = req.params;

    const result = await CarServices.getSingleCarFromDB(id);

    result === null || result.isDeleted === true
    ? sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No Data Found",
        data: [],
      })
    :
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'A car retrieved successfully',
        data: result,
    })
})



const updateCar = catchAsync(async (req, res) => {
    const id = req.params.id;

    // Fetch the car details to check its status
    const car = await CarServices.getCarById(id);
    // const car = await CarServices.getSingleCarFromDB(id);

    car === null || car.isDeleted === true
    ? sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No Data Found",
        data: [],
      })
    :
    car.status === 'unavailable'
    ? sendResponse(res, {
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Cannot be updated this car that is already booked",
        data: {'booked car info': car}
      })
    :
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car updated successfully',
        data: await CarServices.updateCarIntoDB(id, {
            $set: {
              name: req.body.name,
              description: req.body.description,
              isElectric: req.body.isElectric,
              color: req.body.color,
              features: req.body.features,
              pricePerHour: req.body.pricePerHour,
              status: req.body.status,
              isDeleted: req.body.isDeleted,
            },
          }),
    });
});



const deleteCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car deleted successfully',
      data: result,
    });
  });

  

  const returnCar = catchAsync(async (req, res) => {
    const { bookingId, endTime } = req.body;
  
    const result = await CarServices.returnCarIntoDB(bookingId, endTime);
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Car returned Successfully",
      data: result,
    });
  });
  
  



 
  
  
  



export const CarControllers ={
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar,
   
    
}