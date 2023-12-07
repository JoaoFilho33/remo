package com.backend.remo.models.constants;

import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import static com.backend.remo.models.constants.Permission.ADMIN_CREATE;
import static com.backend.remo.models.constants.Permission.ADMIN_DELETE;
import static com.backend.remo.models.constants.Permission.ADMIN_READ;
import static com.backend.remo.models.constants.Permission.ADMIN_UPDATE;
import static com.backend.remo.models.constants.Permission.MANAGER_CREATE;
import static com.backend.remo.models.constants.Permission.MANAGER_DELETE;
import static com.backend.remo.models.constants.Permission.MANAGER_READ;
import static com.backend.remo.models.constants.Permission.MANAGER_UPDATE;
@RequiredArgsConstructor
public enum Role {
    USER,
    ADMIN,
    MANAGER;
}
