package com.EAD2_CW.vehicle_mcs_new.controller;

import com.EAD2_CW.vehicle_mcs_new.data.Vehicle;
import com.EAD2_CW.vehicle_mcs_new.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/RentARide/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAllVehicles(){
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/car/{id}")
    public Vehicle getVehicleById(@PathVariable int id){
        return vehicleService.getVehicleById(id);
    }

    @GetMapping("/brands")
    public List<String> getAllBrands(){
        return vehicleService.getAllDistinctBrands();
    }

    @GetMapping("/models")
    public List<String> getModelsByBrand(@RequestParam String brand){
        return vehicleService.getModelsByBrand(brand);
    }

    @GetMapping("/maxprice")
    public int getMaxCarRentPrice(){
        return vehicleService.getMaxCarRentPrice();
    }

    @GetMapping("/{type}")
    public List<Vehicle> getTenRandomCarsByType(@PathVariable String type){
        return vehicleService.getTenRandomCarsByType(type);
    }

    @GetMapping("/status/{status}")
    public List<Vehicle> getVehiclesByStatus(@PathVariable String status){
        return vehicleService.getVehiclesByStatus(status);
    }

    @GetMapping("cars/{id}")
    public List<Vehicle> getVehiclesByOwnerIdAndStatus(@PathVariable int id, @RequestParam String statuses){
        List<String> statusList = Arrays.asList(statuses.split(","));
        return vehicleService.getVehiclesByOwnerIdAndStatus(id, statusList);
    }

    @GetMapping("carscount/{id}/{status}")
    public int getCarsCountByOwnerIdAndStatus(@PathVariable int id, @PathVariable String status){
        return vehicleService.getCarsCountByOwnerIdAndStatus(id, status);
    }

    @GetMapping("carscount/statuses/{id}")
    public int getCarsCountByOwnerIdAndStatuses(@PathVariable int id, @RequestParam String statuses){
        List<String> statusList = Arrays.asList(statuses.split((",")));
        return vehicleService.getCarsCountByOwnerIdAndStatuses(id, statusList);
    }

    @GetMapping("/filter")
    public List<Vehicle> filterVehicle(
            @RequestParam(required = false) String types,
            @RequestParam(required = false) String brands,
            @RequestParam(required = false) int minPrice,
            @RequestParam(required = false) int maxPrice,
            @RequestParam(required = false) String statuses,
            @RequestParam(required = false) String fueltypes,
            @RequestParam(required = false) String transmissions,
            @RequestParam(required = false) String carIds){
        List<String> typeList = types != null ? Arrays.asList(types.split(",")) : null;
        List<String> brandList = brands != null ? Arrays.asList(brands.split(",")) : null;
        List<String> fuelTypeList = fueltypes != null ? Arrays.asList(fueltypes.split(",")) : null;
        List<String> transmissionList = transmissions != null ? Arrays.asList(transmissions.split(",")) : null;
        List<String> statusList = statuses != null ? Arrays.asList(statuses.split(",")) : null;
        List<String> carIdList = carIds != null ? Arrays.asList(carIds.split(",")) : null;

        return vehicleService.filterVehicles(typeList, brandList, minPrice, maxPrice, statusList, fuelTypeList, transmissionList, carIdList);
    }

    @PostMapping
    public Vehicle addCar(@RequestBody Vehicle vehicle){
        return vehicleService.addCar(vehicle);
    }

    @PutMapping("/{id}")
    public Vehicle updateCar(@PathVariable int id, @RequestBody Vehicle vehicle){
        return vehicleService.updateCar(id, vehicle);
    }

    @DeleteMapping("/{id}")
    public String deleteCar(@PathVariable int id){
        return vehicleService.deleteCar(id);
    }

}
