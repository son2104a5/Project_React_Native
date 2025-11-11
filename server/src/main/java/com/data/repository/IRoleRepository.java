package com.data.repository;

import com.data.model.entity.Role;
import com.data.model.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(UserRole roleName);
}
