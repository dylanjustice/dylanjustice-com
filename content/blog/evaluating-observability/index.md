---
title: Measuring the Observability of a System
description: Developing a forumla to evaluate the score of a given service or system's observability
date: 2024-02-26
---
# Identify the unknowns

* _n_ FastAPI python services
* Solr Cluster
* Lambda
* Apache Flink
* Dependencies
    * Model Service
    * Embeddings Service
    * Retrieve
    * LLM Proxy

## Opportunities
* Istio service mesh
* Datadog
* Kinesis Flink apps are managed. AWS may offer some features to help there.

## Tools at our disposal
* Datadog APM
* Splunk Logs / Fluentbit
* Cloudwatch logs
* cloudwatch metrics

# Observability picture

## FastAPI services
* Datadog instrumentation ✅
* Datadog APM monitoring
    * Latency
    * Error Rate
    * Throughput
* Dependency monitoring
    * Monitor critical resources accessing 3rd party dependencies
    * Validate traces
* Logs
    * If we can't send them to datadog, we should try to send them to splunk. Worst case we leave them in cloudwatch.
    * Make sure the logs are structured
    * Document them in a datadog dashboard or _SOMETHING_ so we can find them quickly
