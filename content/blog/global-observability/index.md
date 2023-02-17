---
title: "Developing a global observability strategy"
date: "2022-11-30"
description: "Taking a step back and looking at all of our products and services"
---

## Background

As someone new to SRE, it's difficult to see the lines between application teams, DevOps teams, Cloud Engineering and Security. We often have similar initiatives, which makes it easy to step on toes. When my boss told me we were going to be developing a so-called, "global observability strategy" for the business, I was immediately overwhelmed. Observability isn't easily generalized. How do we roll out the same strategy across hundreds of products and services?

## Adopting SLOs

As a company, we haven't bought into SLO's as a meaningful metric between SRE and development teams. The reality is, we aren't doing our jobs well if we aren't taking SLO's seriously. SLO's give SRE the data needed to present an application team with evidence of service degradation over time. Without that, convincing teams to prioritize correcting the issue is challenging. SLOs can be difficult to define. It may also be difficult to determine an appropriate indicator for a service.

- User Facing Systems: Availability, Latency, Throughput
- Storage Systems: Latency Availability and Durability
- Big Data Systems/Data pipelines: Throughput, end-to-end latency
- Else, correctness. Was the right answer returned, the right data retrieved, the right analysis done?

Since we are generally collecting metrics from all services deployed to production, there is no reason we should not require a service to set an SLO. It doesn't have to be correct, but it does need to be set so it can be observed. When we are evaluating a new service, we should be thinking about who the users are and what they will care about. From there, we can work backwards to determine what indicators to watch and what the objective should roughly be.

Most organizations use a tool specifically for defining and tracking SLOs. Some build them in-house, and some use out of the box tools like [Nobl9](https://www.nobl9.com/). In the interest of focusing on the goal of defining SLOs and adopting a more error-budget driven approach to SRE, we should seriously consider an off the shelf product that integrates with our existing tooling.

TODO: Categorizing assets from Platinum to Bronze to set the SLO restriction levels

## Service Mesh with Consul

With the number of services we support and the complexity of our network architecture, we're a perfect candidate for Service Mesh. With Hashicorp Consul, we can reduce cloud costs, make service communication more secure (and more straightforward), improve observability and more. Consul works as a sidecar proxy for containerized workloads, but the agent can also be installed on the individual nodes, or added as an integration to Lambda functions. Comcast leveraged Consul for their service mesh when they were experiencing problems with developing a multi-region failover capability, and reducing their network complexity. They ran workloads in AWS as well as on premises and used many different runtimes and operating systems. The advice the representative had was to understand the value added from service mesh. It's a journey, and onboarding services will take time. Consider some of the benefits of time savings and transparency we could see by configuring firewall rules by service rather than by CIDR block. Not to mention, all of this is configured in code.
Other notable features:

- Circuit breaking with Envoy
- mTLS connections between services, and automated certificate renewals
- Traffic splitting and canarying with Consul "intentions"

## Observability trends

Many of the sessions and workshops I attended were centered around observability. In most cases these were a technical sales pitches for a specific product or service. Cisco AppDynamics called it Full-Stack observability, AWS Managed Open Telemetry, Prometheus and Grafana focused on open source software. Regardless of the product, certain trends were covered in each talk. To achieve an observable system, you need the MELT stack. Metrics, Events, Logs and Traces. For the most part, we cover this with our services deployed to production. There was a lot of emphasis put on the business context related to these pillars that could be further explored by LexisNexis. In other words, how can we better attribute customer impact with specific services. There was also an emphasis on collecting deep high-quality metrics to eliminate the cases of "gray failure". This is where your system is neither hard "down" or fully operational. Most instrumentation does not cover this, and it may make a big difference. Lastly, there was great importance placed on understanding the hard and soft dependencies of a service. The dependencies should be treated as first-class citizens in terms of monitoring, to better pinpoint a fault and reduce the amount of finger-pointing. Resilience efforts can be made to convert hard dependencies to soft dependencies to reduce the blast radius of an outage.

## AWS MemoryDB

I attended a workshop that went over the AWS MemoryDB service. It's a Redis compatible database service that claims it is the fastest and most durable database service offering from AWS. The lab covered a microservices architecture in EKS using MemoryDB to handle event queuing and application data storage. It may be a good fit for teams using Redis as a primary database, rather than just a cache store. MemoryDB can replace the usage of a primary database and a cache with a single service.

## Real World Resilience
Customer-centric
   * Data driven decisions based on customer desires
   * more observability equals more proactive

Bank began lift and shift but required application modernization.
Needed visibility into health of services used in their applications and map dependencies of the services ensuring the framework could scale.
First determine critical workloads
Pillars of resilience
1. Monitoring - dashboards that show the problem's root
2. Tests - Chaos engineering framework
3. Map Dependencies - Reduce the blast radius
4. Enhancements - mitigation and improvement from pillars 2 and 3
5. Governance - Suggest improvements
6. Mechanisms - Based on pillars 1-5. Build to scale all applications.

Single Threaded Leader - Product manager or owner
2 "Two Pizza" Teams - Internal teams small enough to be fed with two pizzas.
Evolution based in agile communication standards.

Chaos engineering framework
- Document full of definitions
- Phased approach
- You build it, you run it mentality

Dependency Evaluation
* AWS Services, Hard and Soft dependencies by critical application
* Effort to turn hard dependencies into soft dependencies

Internet account rearchitecture
* Every 2000 gets a transit gateway
* 3 shared vpcs
* Created Service quota table assessing AWS Limits
  * Measure limits and alarm when thresholds are breached
  * Richer observability

Executive Dashboards
* Non App owners should be able to see and understand the health of the applications
* Support experience - Improved MTTD/MTTR

Whiteboard sessions with TAMS to identify gaps?
* Aggregating metrics across many services
* Define critical alarms - KPIs based on key outcomes
* Runbooks
* Still impossible to understand how 4000 apps work - still need to simplify health dashboards
* Traffic light system developed to give everyone the overview of the applications health
* Allow drill down dashboards to explain in more detail

AWS incident detection + response
* Builds on enterprise support
* AWS Team is notified at the same time as the Engineering teams
* Reduces the MTTR

## AWS DevOps Guru

## Operational Readiness Review

## The Final Strategy

1. Everyone gets SLOs (and we get an SLO tool, or build one). Philosophy change. Lead by example.
2. Everyone gets an availability goal so we can set the number for our customer-facing products.
3. Canary deployments for new products to gather data before a launch. ABE 1%, 10%, 50%, 100%. At 100% we should have SLOs in place.
4. MELT across the board
   1. Metrics
   2. Events
   3. Logs
   4. Traces
5. Everyone uses the same tools for monitoring (Datadog, cloudwatch?)
   1. Standard infrastructure level monitors for all services
   2. Build libraries and modules where possible.
6. Everyone uses the same tools for traces (Datadog, OpenTelemetry?)
   1. Are we going to invest in Datadog? If so, use it for the features it provides.
   2. Standard implementations for every tech stack. Build libraries, middleware where necessary.
7. Service catalog to improve the software ownership model
8. Map of hard and soft dependencies for each service. Metrics for those dependencies.

### Extend our observability for our current aggregate metrics

Enable drilldown into aggregate metrics, KPI dashboard

1.  If something is in the yellow or red zones, add progressively more technical dashboards to aid in identifying where the issue occurs
2.  Help with Mean Time to Detect an issue
3.  Add visibility into the meaning behind the metrics

** Make it easier to onboard **

## Links

- [AWS Operational Readiness Review](https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/wa-operational-readiness-reviews.html)
- [Fully managed blue/green deployments for RDS](https://aws.amazon.com/blogs/aws/new-fully-managed-blue-green-deployments-in-amazon-aurora-and-amazon-rds/)
- [Observability Workshop](https://catalog.workshops.aws/observability/en-US)
- [Observability Accelerator](https://github.com/aws-observability/terraform-aws-observability-accelerator)
- [DevOps Guru](https://aws.amazon.com/devops-guru/features/)
- [Noble9](https://www.nobl9.com/)

## Tools to explore

senser.tech -- startup
logz.io
thanos
zenduty -- probably never happens. Too much with xmatters.. but worth a shot
managed prometheus
managed grafana
Loki // grafana logs
noble9 -- SLO tool \*\*\* Want this!
Cisco AppDynamics + ThousandEyes

## Taking a good look at Mesh

@Kyle Patrick - Get together on what would make a good POC. Two or three services.
@Networking @Core Cloud - Talk about a big VPC for the service mesh piece.
@SRE - Price out Consul Connect vs open source. Include reduction in cloud costs, ALBs, SG rule creation/management, Firewall, etc.

## Building Trust with developers

@Andy Biwer - Target some of the more progressive teams and run 9-whys against the concept of trunk based development or at least pushing to production more often

- Trunk based development benefits
- Better code sharing
- More feedback from production
- Press down until something breaks - reel it back

## SRE Launch Plan / Operational Readiness Review

- Needs to include load balancing
- Automated checks?
