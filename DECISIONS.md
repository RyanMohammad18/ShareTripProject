# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

**Answer:**

I have added the answers below in bullet points to make them more readable. But to summarize in one or two lines:

I structured the codebase using Atomic Design (atoms → molecules → organisms → pages) and DRY principles to maintained clean code, reusability, and separation of concerns. Server state is managed using Tanstack Query for caching and retry resilience. For UI state, I used URL search params for persistence across refresh and shareability via links. Error handling is centralized at the system level, where all API failures are automatically captured and shown as notifications.

**Flaky API Request & Loading State**  

- Implemented a resilient client pattern with **exponential backoff** retry (3 retries: 800ms → 1600ms → 3200ms) to reduce the failure rate  
- Used **AbortController signal passing** to cancel stale requests on subsequent API calls
- **Added two loading patterns:** **Skeleton loading** and **progress bar**. Skeletons are used only when there's genuinely nothing to display (first load, distant page jump, filter/search change). **Progress bar** loading is used for pagination so that existing data remains visible instead of showing continuous skeleton loading  
- Implemented **prefetching on click** (next page from destination), so adjacent navigation is instant from cache  
- **Cached previously visited pages** in both localStorage and state, so navigating back does not trigger loading again  
- In the search functionality, used **debounced search** so loading does not trigger on every keystroke, but only after the user stops typing. At that point, skeleton loading is shown

**Error Handling:**  

- **Handled infrastructure error handling** with global querycache subscriber that catches all query failures automatically. Page components do not need to handle that  
- **Standardized different error types** (network issues, timeouts, aborted requests, invalid responses, etc.) using a single normalizeError function to show clear messages  
- **Ensured graceful degradation** too, like if localStorage persistence fails, the app continues using memory cache

## 2. Trade-offs and Omissions
**What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?**

**Answer:**

**Intentionally scoped out:**  

- **Test coverage:** Unit and E2E testing was not included due to time constraints
- **Offline detection:** Currently, the app continues retrying even if there is no internet connection  
- **Image fallback:** Broken product images currently show the browser’s default broken icon  
- **Virtualization:** Needed for handling large lists or card-heavy pages  
- **More user-friendly UI along with improved progress loading:** The UI follows the provided Figma, but improvements could be made (e.g., moving the progress bar to the top of the screen)  

**If I had more time,my priority order would be:**  

- **Unit & E2E test coverage** for better quality assurance
- **Image fallback:** Using onError to replace with placeholder image or SVG  
- **Offline detection:** It can be solved with navigator online listening  
- **More user-friendly feature and UI adjustment** (Pagination Input field, Progressbar loading at the top)  
- **Virtualization:** For this, we can use the react window feature  


## 3. AI Usage

**How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.**

**Answer:**

I used ChatGPT for:  

- **I used AI for pair programming mainly like I discussed for best practices** instead of common approaches, like using callbacks instead of useEffect where appropriate  
- **Tried to identify edge cases** for features and error handling  
- **To review the codebase** to ensure functions are not unnecessarily duplicated  
- **Helping structure and improve the readability** of the documentation, while I also proofread it manually

## 4. Edge Cases Identified

**Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.**

**Answer:**

Yes definitely, as I did not get much time for edge cases there are some cases that I should mention:  
- **Typing space in the search input** also takes it as a letter and shows no product  
- **There is an issue with URL param parsing,** like if a user gives `?page=abc`, it stays on the first page, needs to handle this  
- Suppose a user visits all the pages with categories, there are **large numbers of entries in localStorage** that can be handled  
- **All the images render at a time,** here we can add priority for above-the-fold cards