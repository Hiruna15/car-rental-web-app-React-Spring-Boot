package com.EAD2_CW.vehicle_mcs_new.service;

import com.EAD2_CW.vehicle_mcs_new.data.Vehicle;
import com.EAD2_CW.vehicle_mcs_new.data.VehicleRepository;
import com.EAD2_CW.vehicle_mcs_new.data.VehicleSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle addCar(Vehicle vehicle){
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles(){
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(int id){
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return vehicle.orElse(null);
    }

    public List<String> getAllDistinctBrands(){
        return vehicleRepository.findAllDistinctBrands();
    }

    public List<String> getModelsByBrand(String brand){
        return vehicleRepository.findAllModelsByBrand(brand);
    }

    public int getMaxCarRentPrice(){
        return vehicleRepository.findMaxRentPrice();
    }

    public List<Vehicle> getTenRandomCarsByType(String type){
        List<Integer> randomIds = vehicleRepository.findTenRandomCarIdsOfOneType(type);
        return vehicleRepository.findCarsByIds(randomIds);
    }

    public List<Vehicle> getVehiclesByStatus(String status){
        return vehicleRepository.findCarsByStatus(status);
    }

    public List<Vehicle> getVehiclesByOwnerIdAndStatus(int ownerId, List<String> statusList){
        return vehicleRepository.findCarsByOwnerIdAndStatuses(ownerId, statusList);
    }

    public int getCarsCountByOwnerIdAndStatus(int id, String status){
        return vehicleRepository.findCarsCountByOwnerIdAndStatus(id, status);
    }

    public int getCarsCountByOwnerIdAndStatuses(int ownerId, List<String> statusList){
        return vehicleRepository.findCarsCountByOwnerIdAndStatuses(ownerId,statusList);
    }

    public List<Vehicle> filterVehicles(List<String> types, List<String> brands, int minPrice, int maxPrice, List<String> statuses, List<String> fueltypes, List<String> transmissions, List<String> carIds){
        Specification<Vehicle> spec = Specification.where(null);

        if(types != null && !types.isEmpty()){
            spec = spec.and(VehicleSpecifications.hasType(types));
        }
        if(brands != null && !brands.isEmpty()){
            spec = spec.and(VehicleSpecifications.hasBrand(brands));
        }
        if(minPrice >= 0 && maxPrice > 0){
            spec = spec.and(VehicleSpecifications.hasPriceBetween(minPrice, maxPrice));
        }
        if(statuses != null){
            spec = spec.and(VehicleSpecifications.hasStatus(statuses));
        }
        if(fueltypes != null){
            spec = spec.and(VehicleSpecifications.hasFuelType(fueltypes));
        }
        if(transmissions != null){
            spec = spec.and(VehicleSpecifications.hasTransmission(transmissions));
        }
        if(carIds != null){
            spec = spec.and(VehicleSpecifications.hasCarId(carIds));
        }

        return vehicleRepository.findAll(spec);
    }

    public Vehicle updateCar(int id, Vehicle vehicle){
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(id);

        if(existingVehicle.isPresent()){
            Vehicle updatedVehicle = existingVehicle.get();
            if (vehicle.getNumberplate() != null) {
                updatedVehicle.setNumberplate(vehicle.getNumberplate());
            }
            if (vehicle.getYear() != 0) {
                updatedVehicle.setYear(vehicle.getYear());
            }
            if (vehicle.getType() != null) {
                updatedVehicle.setType(vehicle.getType());
            }
            if (vehicle.getRentaltype() != null) {
                updatedVehicle.setRentaltype(vehicle.getRentaltype());
            }
            if (vehicle.getColor() != null) {
                updatedVehicle.setColor(vehicle.getColor());
            }
            if (vehicle.getPrice() != 0) {
                updatedVehicle.setPrice(vehicle.getPrice());
            }
            if (vehicle.getModel() != null) {
                updatedVehicle.setModel(vehicle.getModel());
            }
            if (vehicle.getBrand() != null) {
                updatedVehicle.setBrand(vehicle.getBrand());
            }
            if (vehicle.getStatus() != null) {
                updatedVehicle.setStatus(vehicle.getStatus());
            }
            if (vehicle.getTransmission() != null) {
                updatedVehicle.setTransmission(vehicle.getTransmission());
            }
            if (vehicle.getFueltype() != null) {
                updatedVehicle.setFueltype(vehicle.getFueltype());
            }
            if (vehicle.getLat() != null) {
                updatedVehicle.setLat(vehicle.getLat());
            }
            if (vehicle.getLng() != null) {
                updatedVehicle.setLng(vehicle.getLng());
            }
            if (vehicle.getAddress() != null) {
                updatedVehicle.setAddress(vehicle.getAddress());
            }
            if (vehicle.getCity() != null) {
                updatedVehicle.setCity(vehicle.getCity());
            }
            return  vehicleRepository.save(updatedVehicle);
        } else{
            throw new RuntimeException("Vehicle not found with ID: " + id);
        }
    }

    public String deleteCar(int id){
        vehicleRepository.deleteById(id);
        return "Vehicle deleted successfully";
    }
}
