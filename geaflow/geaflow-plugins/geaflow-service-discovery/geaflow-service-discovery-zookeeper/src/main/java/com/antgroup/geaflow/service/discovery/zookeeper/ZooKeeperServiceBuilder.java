/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package com.antgroup.geaflow.service.discovery.zookeeper;

import com.antgroup.geaflow.common.config.Configuration;
import com.antgroup.geaflow.service.discovery.ServiceBuilder;
import com.antgroup.geaflow.service.discovery.ServiceConsumer;
import com.antgroup.geaflow.service.discovery.ServiceProvider;

public class ZooKeeperServiceBuilder implements ServiceBuilder {

    private static final String SERVICE_TYPE = "zookeeper";

    @Override
    public ServiceConsumer buildConsumer(Configuration configuration) {
        return new ZooKeeperServiceConsumer(configuration);
    }

    @Override
    public ServiceProvider buildProvider(Configuration configuration) {
        return new ZooKeeperServiceProvider(configuration);
    }

    @Override
    public String serviceType() {
        return SERVICE_TYPE;
    }
}
