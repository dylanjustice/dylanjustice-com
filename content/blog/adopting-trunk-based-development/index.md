---
title: "Adopting Trunk Based Development"
date: "2022-08-30"
description: "Accelerate your team's productivity with TBD"
---

### Introduction

Software development has always been about one thing. Shipping code, new features, and delivering to their consumers as fast as possible. The story doesn't change, in fact it only gets more severe as technology advances. The density of software in the market leaves no room for stale applications, buggy features or unreliable services. LexisNexis is no exception. Our business outcomes are almost directly tied to IT performance. In addition, many of our applications are under heavy stress from usage all over the globe, all day, every day. We require high security standards to protect our customers' from potential cyber threats, and to protect our investments on-prem and in the cloud. And we're asked to continue improving the quality and reliability of our existing software, while delivering new features to delight the user.

Throughout the organization, nearly every development strategy is in practice. For the most part, we show a commitment to Agile practices through task management tactics. These are merely tools that facilitate a more organized approach to work. Most teams still face a bottleneck that you may not have considered, unless someone pointed it out to you. It takes too long for your code to go from your editor, to production. And it's probably not because you're slow at writing code. You could be, I don't know. I'm not particularly fast myself. But if you're anything like me, there are steps in the process of pushing code that simply take too long. Good news is, they can be either removed or modified to make you and your teams more efficient.

### About Me

I'm Dylan Justice, and I'm an Site Reliability Engineer. SRE for short. You may be most familiar with the SRE team during or after a production incident. We focus on our system's production infrastructure, solving operations problems using software engineering. This means building tools and automations to reduce our MTTR, or mean time to respond, to production issues. It also means ensuring our applications have appropriate levels of monitoring and alerting. We treat production issues as opportunities to learn, and use those opportunities to reflect with application teams on how we can improve to reduce the likelihood of history repeating itself.

Prior to being an SRE, I was a software engineer on product development teams for 9 years. I've worked with many languages in that time, both frontend and backend. But my background is primarily dotnet, with a more recent love developing in React. I have a couple of stories I'll integrate into the discussion that will help paint the picture of how trunk based development transformed how I think about developing software forever.




### Git Flow / Traditional Software Development

A common approach to change management in software is for developers to branch off of either a mainline or development branch of the repository. They create feature branches in order to preserve the integrity of the main branch while they write changes intended to be merged back into the main branch downstream. When changes are complete, a pull request is opened and the code goes through a technical review by at least one peer, or in some cases a governing body of reviewers. Reviewers can request the author to make changes to the feature branch to meet standards and correct potential issues before they will approve of the merge. A discussion is usually formed within the PR and the author will push new changes to the feature branch to satisfy the reviewers. When the branch meets the standars of the reviewers, and the required number of approvals have been reached, the PR is merged into the mainline branch and the work can be sent to the next stage of it's lifecycle. This is usually a working or staging environment that allows functional testing, visual design review, and possibly performance testing to be performed on the new feature. Once the feature has passed the standards to be put into the production environment, a release is scheduled and eventually deployed to production.

This model is widely adopted and is considered a succesful approach to working in version control with teams. It suits contributors of open source software on Github. Contributors are usually not working on the project full time, and may need a long running branch to complete a task or issue over the course of weeks or months. Git flow allows plenty of visibility and control over the main branch, preventing unwanted changes from being released to the production environment. In this model, releases are often thoroughly tested and vetted in lower environments prior to going to production. The cadence of releasing software tends to be on a monthly or quarterly basis. Although, it's not uncommon to have high performing teams working in this model doing weekly releases.

### Trunk Based Development: The Five Minute Overview

Trunk based development is a "source-control branching model, where developers collaborate on code in a single branch called `trunk`, resist any pressure to create other long-lived development branches by employing documented techniques. They therefore avoid merge hell, do not break the build, and live happily ever after" [1][1].

Now that we've discussed Git-Flow, how is TBD different? Git flow is highly dependent on branches, which can cause problems. Teams working in branches can become disconnected from eachother. Lack of communication can cause unexpected merge conflicts, regressions due to a bad merge, and worst of all: duplicated code. Trunk based teams are committing early and often to the main branch, which allows contributors to share work as they build.
In many cases, trunk is linked directly to the production application. This means the build cannot be broken, and the team's priority is to maintain releasability. This often requires a mindset change. It's difficult at first to grasp the concept of having work-in-progress committed to `trunk` and ready to be released at any time. In most cases, using feature flags to corral changes to existing code is an excellent way to manage this paradigm. By consistently maintaining a releasable main branch, you eliminate the need for a "code-freeze" to stablize the environment in preparation for a release. In *Accelerate*, the 2017 state of devops report claimed "developing off trunk/master rather than on long-lived feature branches was correlated with higher delivery performance" [2](#References). Performance in this context is measured in terms of release frequency, or lead-time. Since the core concept of TBD is maintaining releasability, product teams are able to release to production on a more frequent basis. In advanced cases, multiple times per day.



### Example No. 1: The Vicious Cycle

Consider this scenario:
Jack is an engineer developing a large feature for the application. At the beginning of the two week sprint, he branches off the main branch and begins work. After a week, he opens a PR with his changes. It's a large diff and will take his teammates a significant chunk of time to review it. The team requires two peer approvals before the feature branch can be merged into the development branch, and everyone is working on features. After sitting unreviewed for about a day, his teammates set aside enough time to review the PR. One teammate approves, another leaves requested changes and will approve after Jack has completed the tasks. Another day passes and Jack completes all of the requested changes; his teammate approves. The PR is merged into the main branch and deploys the application to a staging environment. The QA team and Design team are notified the feature is ready for testing. Jack takes a new story, and begins a new branch. That day, the QA Team comes back to him with issues that came up during testing. In addition, the design team has tweaks to the interface that need to be made.
There are now two days left in the sprint, and Jack opens another branch to fix the bugs. He opens another PR and requests a review from his teammates, which is quickly reviewed and merged. Jack notifies the team that the feature is ready to be re-tested and starts work on the other user story. Miraculously, the story passes both QA and design and is sent to the product owner for final verification before the end of the sprint.

This story may sound familiar as Jack is far from exceptional.

![Obi-Wan](obiwan.gif)

What are some of the issues that affected Jack's performance during the sprint?
> Note: Could be fun to do a 1-2-4-All for this.

1. He didn't ask for any input during the development phase, and resulted in a long code review process.
2. He wasn't able to get feedback from QA or Design until after all of the work he thought the feature required was completed.
3. The code review process left him without work and in limbo.

This scenario highlights a few issues that can be alleviated through implementation of TBD as well as general agile concepts.

Huge PR's are a well-known nightmare for software engineers. The memory of a friendly note from a colleague asking for a "quick PR" on a 150 file diff on Friday afternoon is enough to send shivers down my spine. It also forces the reviewers to choose between a quality review, and meeting their own deadlines. Delivering code in smaller, digestable chunks leads to faster feedback loops with peers, faster deployments and ultimately reduced lead time. At scale, trunk based development is aligned with the theory of having short lived feature branches (think hours, not days) that are branched off of trunk, and merged back in assuming Continuous Integration passes. This requires a shift in the planning phase of the work, to ensure work is broken down into the smallest vertical slices possible, and engineers can deliver increments in less than a day.



### Example #2: Release Branches

At full capacity a product team was eight software engineers, a UI/UX designer, a product owner, and a scrum master. They work in 2 week sprints and release to production on the same interval. The team was already set up with four branches, `development`, `working`, `staging`, and `production`. They worked off of the `development` branch, and the other three were configured to deploy automatically to the respective integrated environments when changes were merged.


## References
* [1][1]: "Introduction" www.trunkbaseddevelopment.com Accessed 09/12/2022
* 2 Forsgren, N., Humble, J., & Kim, G. (2018). Trunk-Based Development. In Accelerate: The science behind devops: Building and scaling high performing technology organizations (pp. 55–56). essay, IT Revolution.


[1]: https://trunkbaseddevelopment.com/#one-line-summary "One-line summary"

