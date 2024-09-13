package com.EAD2_CW.vehicle_mcs_new.data;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

public class VehicleSpecifications {

    public static Specification<Vehicle> hasType(List<String> types){
        return (Root<Vehicle> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) ->
                root.get("type").in(types);
    }

    public static Specification<Vehicle> hasBrand(List<String> brands){
        return (Root<Vehicle> root,CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) ->
                root.get("brand").in(brands);
    }

    public static Specification<Vehicle> hasPriceBetween(int minPrice, int maxPrice){
        return (Root<Vehicle> root, CriteriaQuery<?> query,CriteriaBuilder criteriaBuilder) ->
                criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
    }

    public static Specification<Vehicle> hasStatus(List<String> statuses){
        return (Root<Vehicle> root, CriteriaQuery<?> query,CriteriaBuilder criteriaBuilder) ->
                root.get("status").in(statuses);
    }

    public static Specification<Vehicle> hasFuelType(List<String> fuel_types){
        return (Root<Vehicle> root,CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) ->
                root.get("fueltype").in(fuel_types);
    }

    public static Specification<Vehicle> hasTransmission(List<String> transmissions){
        return (Root<Vehicle> root,CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) ->
                root.get("transmission").in(transmissions);
    }

    public static  Specification<Vehicle> hasCarId(List<String> carIds){
        List<Integer> carIdsAsIntegers = carIds.stream()
                .map(Integer::valueOf)
                .collect(Collectors.toList());

        return (Root<Vehicle> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) ->
                root.get("id").in(carIdsAsIntegers);
    }
}
