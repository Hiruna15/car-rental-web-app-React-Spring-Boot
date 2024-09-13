package com.EAD2_CW.vehicle_mcs_new.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer>, JpaSpecificationExecutor<Vehicle> {

    @Query("SELECT DISTINCT v.brand FROM Vehicle v")
    List<String> findAllDistinctBrands();

    @Query("SELECT DISTINCT v.model FROM Vehicle v WHERE v.brand=?1")
    List<String> findAllModelsByBrand(String brand);

    @Query("SELECT MAX(v.price) FROM Vehicle v")
    int findMaxRentPrice();

    @Query(value = "SELECT id FROM vehicles WHERE type = ?1 AND status IN ('available', 'currentlyrented', 'unavailable') ORDER BY RAND() LIMIT 6", nativeQuery = true)
    List<Integer> findTenRandomCarIdsOfOneType(String type);

    @Query("SELECT v FROM Vehicle v WHERE v.id IN :ids")
    List<Vehicle> findCarsByIds(@Param("ids") List<Integer> ids);

    @Query("SELECT v FROM Vehicle v WHERE v.status=?1")
    List<Vehicle> findCarsByStatus(String status);

    @Query("SELECT v FROM Vehicle v WHERE v.ownerid = :ownerId AND v.status IN :statuses")
    List<Vehicle> findCarsByOwnerIdAndStatuses(@Param("ownerId") int ownerId,
                                               @Param("statuses") List<String> statuses);

    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.ownerid = ?1 AND v.status = ?2")
    int findCarsCountByOwnerIdAndStatus(int id, String status);

    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.ownerid = :ownerId AND v.status IN :statuses")
    int findCarsCountByOwnerIdAndStatuses(@Param("ownerId") int ownerId, @Param("statuses") List<String> statuses);
}
