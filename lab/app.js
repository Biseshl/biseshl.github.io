(() => {
    'use strict';

    const priorityGuide = {
        P1: { label: 'P1 · Critical', description: 'Trading stopped for a whole store or several stores' },
        P2: { label: 'P2 · High', description: 'Major impact with no practical workaround' },
        P3: { label: 'P3 · Medium', description: 'Limited impact or a workaround is available' },
        P4: { label: 'P4 · Low', description: 'Request, information, or planned access work' }
    };

    const scenarios = [
        {
            id: 'RSD-101',
            queueTitle: 'One register offline',
            title: 'Front POS terminal cannot connect',
            store: 'Fictional Store 184',
            channel: 'Phone',
            caller: 'Store Manager',
            callerInitials: 'SM',
            reportedPriority: 'P3',
            correctPriority: 'P3',
            sla: '30 min',
            category: 'POS / Endpoint',
            initialMessage: 'Our front POS says it cannot connect, but the second register is still working.',
            questions: [
                { id: 'scope', text: 'Is one register or every register affected?', response: 'Only the front register is affected. The second register is still processing sales.', useful: true, why: 'This confirms limited impact and that a workaround is available.' },
                { id: 'error', text: 'What exact message appears on screen?', response: 'It says: “Unable to reach POS service.”', useful: true, why: 'Exact errors help separate application, device, and network issues.' },
                { id: 'connectivity', text: 'Can the terminal open the staff intranet?', response: 'No. The page does not load on that terminal, but it loads on the other register.', useful: true, why: 'This points toward local connectivity rather than a POS-wide outage.' },
                { id: 'changes', text: 'Was anything moved or changed recently?', response: 'The counter was cleaned this morning and the terminal was shifted slightly.', useful: true, why: 'Recent physical changes can explain a single-device connectivity fault.' },
                { id: 'photo', text: 'Can you send a photo of the whole counter?', response: 'I can, but there is no visible damage.', useful: false, why: 'A photo is unlikely to add useful information before basic connectivity checks.' },
                { id: 'sales', text: 'What is today’s exact sales total?', response: 'I would rather not share sales figures. The second register is keeping us trading.', useful: false, why: 'Exact financial information is unnecessary for this diagnosis.' }
            ],
            actions: [
                { id: 'compare', text: 'Compare connectivity with the working register', detail: 'Check whether the issue is isolated to the affected endpoint.', result: 'The working register reaches both the intranet and POS service normally.', useful: true },
                { id: 'status', text: 'Check the fictional POS service-status page', detail: 'Rule out a known service issue before changing the device.', result: 'No active POS incidents are listed.', useful: true },
                { id: 'cable', text: 'Check the ethernet cable and link light', detail: 'Ask the manager to inspect the external cable without opening equipment.', result: 'The cable is loose and the network link light is off.', useful: true, critical: true },
                { id: 'reseat', text: 'Ask the manager to reseat the external network cable', detail: 'A safe, reversible check based on the evidence collected.', result: 'The link light returns and the POS reconnects successfully.', useful: true, critical: true },
                { id: 'router', text: 'Reboot the entire store router immediately', detail: 'This would interrupt the working register and other connected devices.', result: 'This would create additional store-wide disruption and requires authorisation.', useful: false, unsafe: true },
                { id: 'factory', text: 'Factory-reset the POS terminal', detail: 'This is a high-impact action without evidence of a configuration fault.', result: 'A factory reset is not authorised and could remove required configuration.', useful: false, unsafe: true }
            ],
            decisions: [
                { id: 'resolve-monitor', text: 'Confirm service is restored, document the loose connection, and ask the store to monitor it', detail: 'The fault is resolved and the store still has a safe follow-up path.', correct: true },
                { id: 'major-incident', text: 'Declare a P1 major incident and contact every store', detail: 'The evidence shows one affected terminal, not a wider incident.', correct: false },
                { id: 'replace-device', text: 'Order a replacement terminal immediately', detail: 'Replacement is premature after connectivity has been restored.', correct: false }
            ],
            communications: [
                { id: 'clear-update', text: '“The front register is connected again after the cable was secured. Please continue using it and contact us if the connection drops again.”', correct: true },
                { id: 'guarantee', text: '“It is permanently fixed now and will not happen again.”', correct: false },
                { id: 'technical-only', text: '“Layer-one connectivity was restored following physical interface remediation.”', correct: false }
            ],
            hints: {
                triage: 'Start by confirming scope. One failed register and a working alternative usually means a lower impact than a store-wide outage.',
                investigate: 'Prefer safe, reversible checks that match the evidence. Avoid disrupting equipment that is still working.',
                decide: 'Your decision should reflect the restored service and give the store a clear next step.',
                document: 'Capture the impact, checks performed, root cause, outcome, and what the store was asked to monitor.'
            },
            kb: { id: 'KB-014', title: 'Retail POS connectivity checks', summary: 'Separate endpoint connectivity from wider POS service issues using scope, comparison, link status, and safe cable checks.', keywords: 'pos register terminal cable network connectivity retail' },
            noteKeywords: ['register', 'cable', 'connection', 'restored', 'monitor'],
            idealNote: 'Store 184 reported the front POS unable to reach the POS service; second register remained operational. Confirmed no known outage and isolated the issue to the endpoint. Store manager found the external ethernet cable loose and reseated it; link light returned and POS connectivity was restored. Manager completed a successful transaction test and was asked to monitor the connection.'
        },
        {
            id: 'RSD-102',
            queueTitle: 'Store connectivity outage',
            title: 'Entire store has lost connectivity',
            store: 'Fictional Store 052',
            channel: 'Phone',
            caller: 'Assistant Manager',
            callerInitials: 'AM',
            reportedPriority: 'P3',
            correctPriority: 'P1',
            sla: '10 min',
            category: 'Network / Store outage',
            initialMessage: 'Both registers, the office computer, and payment devices are offline. We cannot process normal sales.',
            questions: [
                { id: 'scope', text: 'Which devices and services are affected?', response: 'Both registers, the office computer, Wi-Fi, and payment devices are all disconnected.', useful: true, why: 'This confirms store-wide impact rather than one endpoint.' },
                { id: 'trade', text: 'Can the store continue trading using any approved workaround?', response: 'We can take a small number of cash sales, but most customers need card payments.', useful: true, why: 'Business impact and workaround availability determine urgency.' },
                { id: 'power', text: 'Does the store still have normal electrical power?', response: 'Yes. Lights and non-networked equipment are operating normally.', useful: true, why: 'This helps separate a power outage from a connectivity outage.' },
                { id: 'start', text: 'When did the outage begin?', response: 'About eight minutes ago. Everything disconnected at the same time.', useful: true, why: 'A common start time supports a shared infrastructure cause.' },
                { id: 'weather', text: 'What is the weather outside?', response: 'It is clear. We have not noticed any local power or weather issue.', useful: false, why: 'Weather is not a useful first-line question when direct scope and device evidence are available.' },
                { id: 'personal', text: 'Can staff use their personal hotspot for the POS?', response: 'We have not connected business devices to personal networks.', useful: false, why: 'Personal networks should not be introduced as an unapproved workaround.' }
            ],
            actions: [
                { id: 'status', text: 'Check network monitoring and the known-outage board', detail: 'Look for a provider, region, or site alert before local changes.', result: 'Monitoring shows Store 052 unreachable; no wider outage is currently posted.', useful: true },
                { id: 'indicators', text: 'Ask for visible router indicator colours only', detail: 'Use read-only observations without asking staff to open network equipment.', result: 'The power light is on, but the internet indicator is red.', useful: true },
                { id: 'impact', text: 'Record trading impact and available workaround', detail: 'Capture that card payments and normal sales processing are unavailable.', result: 'Impact recorded: whole store, most sales blocked, limited cash-only workaround.', useful: true, critical: true },
                { id: 'escalate-network', text: 'Escalate to the network/on-call team with evidence', detail: 'Provide store, start time, impact, indicators, monitoring result, and contact details.', result: 'Network team accepts the escalation and identifies a carrier circuit fault.', useful: true, critical: true },
                { id: 'reboot', text: 'Ask the store to repeatedly power-cycle all network equipment', detail: 'Uncontrolled restarts can delay diagnosis and may violate the support procedure.', result: 'Repeated restarts are not authorised and would remove useful diagnostic state.', useful: false, unsafe: true },
                { id: 'cabinet', text: 'Ask a staff member to open and re-patch the network cabinet', detail: 'Store staff should not make unapproved changes inside communications equipment.', result: 'This action is unsafe and outside the store user’s authorised task scope.', useful: false, unsafe: true }
            ],
            decisions: [
                { id: 'p1-escalate', text: 'Treat as a P1 store outage, escalate immediately, and maintain timed updates to the store', detail: 'Whole-store trading impact and no practical card-payment workaround require urgent coordination.', correct: true },
                { id: 'wait', text: 'Place the ticket on hold for two hours to see whether it recovers', detail: 'Waiting does not reflect the active trading impact.', correct: false },
                { id: 'desktop', text: 'Reassign only to desktop support as an office-computer issue', detail: 'Multiple device types indicate shared site connectivity, not one computer.', correct: false }
            ],
            communications: [
                { id: 'clear-update', text: '“This is being handled as a critical store connectivity outage. The network team has the evidence and is investigating; I will update you within 15 minutes even if there is no resolution yet.”', correct: true },
                { id: 'vague', text: '“Someone is looking at it. Please wait.”', correct: false },
                { id: 'promise', text: '“The carrier will definitely restore it in ten minutes.”', correct: false }
            ],
            hints: {
                triage: 'Consider business impact, affected scope, and whether the store has a practical way to continue normal trading.',
                investigate: 'Collect read-only evidence and preserve diagnostic state. Avoid asking store staff to change network infrastructure.',
                decide: 'A full-store outage needs ownership, an appropriate escalation, and scheduled updates—not just reassignment.',
                document: 'Include every affected service, trading impact, start time, monitoring result, visible indicators, escalation reference, and next update time.'
            },
            kb: { id: 'KB-021', title: 'Whole-store network outage triage', summary: 'Confirm power, scope, trading impact, monitoring state, visible indicators, and escalation information without making unauthorised network changes.', keywords: 'network outage router store internet carrier p1 trading' },
            noteKeywords: ['store-wide', 'trading', 'network', 'escalated', 'update'],
            idealNote: 'Store 052 reported simultaneous loss of connectivity across both POS registers, office PC, Wi-Fi, and payment devices at approximately 10:12. Mains power remained available; store could accept limited cash only. Monitoring confirmed the site unreachable and the router internet indicator was red. Logged as P1 due to whole-store trading impact and escalated to the network on-call team with all evidence. Store advised of 15-minute update cadence.'
        },
        {
            id: 'RSD-103',
            queueTitle: 'Receipt printer not printing',
            title: 'Receipt printer jobs remain in queue',
            store: 'Fictional Store 231',
            channel: 'Chat',
            caller: 'Retail Team Member',
            callerInitials: 'RT',
            reportedPriority: 'P3',
            correctPriority: 'P3',
            sla: '30 min',
            category: 'Printer / Peripheral',
            initialMessage: 'The back-counter receipt printer is not printing. The main counter printer still works.',
            questions: [
                { id: 'scope', text: 'Is one printer or every printer affected?', response: 'Only the back-counter printer is affected. The main counter printer is fine.', useful: true, why: 'This confirms local impact and an available workaround.' },
                { id: 'lights', text: 'Are there any warning lights or messages?', response: 'The printer has a normal green light and no paper warning.', useful: true, why: 'Device status helps distinguish hardware, supply, and queue issues.' },
                { id: 'queue', text: 'Do jobs appear in the Windows print queue?', response: 'Yes. Three jobs are showing with the first one marked as Error.', useful: true, why: 'This points toward a stuck queue or job rather than missing output instructions.' },
                { id: 'changes', text: 'Was the paper roll or printer changed recently?', response: 'The paper roll was replaced, but it is seated correctly and feeds with the button.', useful: true, why: 'Recent changes and a successful feed test help narrow the fault.' },
                { id: 'brand', text: 'What brand of paper was purchased?', response: 'It is the usual approved receipt paper.', useful: false, why: 'The queue error is more relevant than the paper brand at this stage.' },
                { id: 'all-reboot', text: 'Can everyone restart their computers now?', response: 'That would interrupt several staff who are serving customers.', useful: false, why: 'A broad restart is disproportionate to one printer queue issue.' }
            ],
            actions: [
                { id: 'power-cable', text: 'Confirm power, data cable, and normal device indicator', detail: 'Start with visible physical status and connection.', result: 'Power and USB connections are secure; the indicator remains green.', useful: true },
                { id: 'queue', text: 'Inspect the print queue and first failed job', detail: 'Check whether one corrupted job is blocking later receipts.', result: 'The first document is stuck in Error and is blocking the remaining jobs.', useful: true, critical: true },
                { id: 'clear-job', text: 'Cancel the failed job and restart the approved print service', detail: 'Use the documented queue-recovery procedure.', result: 'The failed job clears and the remaining test receipt prints successfully.', useful: true, critical: true },
                { id: 'test', text: 'Print an approved test receipt', detail: 'Verify service before closing the incident.', result: 'The test receipt prints correctly at the back counter.', useful: true },
                { id: 'driver', text: 'Download a printer driver from an unofficial website', detail: 'Unapproved software introduces security and support risk.', result: 'Third-party driver downloads are not permitted.', useful: false, unsafe: true },
                { id: 'dismantle', text: 'Ask the user to dismantle the printer casing', detail: 'Internal hardware work is not appropriate for the store user.', result: 'The user should not open or dismantle managed equipment.', useful: false, unsafe: true }
            ],
            decisions: [
                { id: 'resolve', text: 'Confirm the test receipt, document the cleared failed job, and resolve the incident', detail: 'The service has been verified and the workaround is no longer required.', correct: true },
                { id: 'replace', text: 'Arrange an urgent printer replacement', detail: 'Replacement is not justified after successful queue recovery and testing.', correct: false },
                { id: 'p1', text: 'Raise a P1 because a receipt printer was unavailable', detail: 'One printer was affected and another printer remained available.', correct: false }
            ],
            communications: [
                { id: 'clear-update', text: '“The failed print job was blocking the queue. It has been cleared and a test receipt printed successfully. Please let us know if jobs begin sticking again.”', correct: true },
                { id: 'blame', text: '“Someone at the store caused the print queue to fail.”', correct: false },
                { id: 'short', text: '“Printer fixed. Closing.”', correct: false }
            ],
            hints: {
                triage: 'A working second printer is an important workaround. Confirm device status and whether jobs are reaching the queue.',
                investigate: 'Follow the evidence from the normal device light and queued Error state before considering software installation or hardware replacement.',
                decide: 'Always verify the fix with a safe test before resolving the incident.',
                document: 'Record which printer was affected, workaround availability, queue state, recovery action, and successful test.'
            },
            kb: { id: 'KB-007', title: 'Receipt printer queue recovery', summary: 'Check power and connection, identify blocked jobs, follow the approved queue-clear procedure, and verify with a test receipt.', keywords: 'printer receipt queue stuck job spooler peripheral' },
            noteKeywords: ['printer', 'queue', 'failed job', 'test', 'printed'],
            idealNote: 'Store 231 reported the back-counter receipt printer not printing; main counter printer remained available. Device power, USB connection, paper, and status light were normal. Windows queue showed the first job in Error and blocking three later jobs. Cancelled the failed job and restarted the approved print service per KB-007. Test receipt printed successfully and user confirmed normal operation.'
        },
        {
            id: 'RSD-104',
            queueTitle: 'New starter access',
            title: 'New employee has no system access',
            store: 'Fictional Store 096',
            channel: 'Portal',
            caller: 'Store Manager',
            callerInitials: 'SM',
            reportedPriority: 'P2',
            correctPriority: 'P4',
            sla: '4 business hrs',
            category: 'Access / Service request',
            initialMessage: 'Our new team member started today and cannot sign in. Please create access urgently.',
            questions: [
                { id: 'request', text: 'Is there an approved onboarding or access request?', response: 'I submitted the onboarding form last week and have the request reference.', useful: true, why: 'Access must be linked to an approved request and authorised role.' },
                { id: 'identity', text: 'Can you confirm the employee ID and approved manager?', response: 'Yes. The employee record is active and I am listed as the approving manager.', useful: true, why: 'Identity and authority must be verified before access work.' },
                { id: 'systems', text: 'Which systems and role does the employee require?', response: 'Standard store team-member access only—email, learning portal, and rostering.', useful: true, why: 'Least-privilege access depends on a defined role and required systems.' },
                { id: 'start', text: 'What is the confirmed start date and store?', response: 'Today at Store 096. The onboarding request shows the same details.', useful: true, why: 'This helps validate the request and route it correctly.' },
                { id: 'personal-email', text: 'What is the employee’s personal email password?', response: 'We will not provide any personal passwords.', useful: false, why: 'Personal credentials are never required for business access provisioning.' },
                { id: 'coworker', text: 'Can they use another employee’s account for today?', response: 'We have not shared anyone else’s account.', useful: false, why: 'Shared credentials break accountability and security requirements.' }
            ],
            actions: [
                { id: 'verify-request', text: 'Verify the approved onboarding request and employee record', detail: 'Confirm requester, manager, store, start date, and standard role.', result: 'The onboarding request is valid and approved for the standard store role.', useful: true, critical: true, securityCritical: true },
                { id: 'check-status', text: 'Check account-provisioning status', detail: 'Determine whether the account exists, is pending, or failed.', result: 'The account exists but the standard role assignment is still pending.', useful: true },
                { id: 'kb', text: 'Follow the approved new-starter access workflow', detail: 'Use the documented fulfilment and escalation path.', result: 'The workflow requires reassignment to Identity Fulfilment with the request reference.', useful: true },
                { id: 'route', text: 'Route to Identity Fulfilment with verified details', detail: 'Provide the approved request, employee ID, role, store, and start date.', result: 'Identity Fulfilment accepts the request and provides a 60-minute target.', useful: true, critical: true },
                { id: 'shared', text: 'Give the new starter a co-worker’s username temporarily', detail: 'Shared accounts remove accountability and expose another user’s access.', result: 'Credential sharing is prohibited.', useful: false, unsafe: true },
                { id: 'temp-password', text: 'Send a temporary password through an open group chat', detail: 'Credentials must use the approved secure delivery and identity-verification process.', result: 'Open group chat is not an approved channel for credentials.', useful: false, unsafe: true }
            ],
            securityRequiredIds: ['verify-request'],
            decisions: [
                { id: 'fulfilment', text: 'Keep it as a P4 access request and route it through approved Identity Fulfilment with the verified reference', detail: 'The request is urgent to the user but remains planned access fulfilment with a defined process.', correct: true },
                { id: 'incident', text: 'Convert it to a P1 security incident', detail: 'There is no evidence of compromise or a critical service outage.', correct: false },
                { id: 'share', text: 'Let the employee use the manager’s account until tomorrow', detail: 'Account sharing is not an acceptable workaround.', correct: false }
            ],
            communications: [
                { id: 'clear-update', text: '“I verified the approved onboarding request and found the role assignment still pending. It is now with Identity Fulfilment under the existing reference, with a current target of 60 minutes. Please do not share another user’s account.”', correct: true },
                { id: 'promise', text: '“Your account will definitely be ready in five minutes.”', correct: false },
                { id: 'share', text: '“Use any available team account while you wait.”', correct: false }
            ],
            hints: {
                triage: 'Urgency and priority are not the same. Confirm whether this is an approved service request and verify who is authorised.',
                investigate: 'Identity, approval, role, and least privilege come before speed. Never create a workaround based on shared credentials.',
                decide: 'Use the documented fulfilment route and provide a realistic update rather than bypassing access controls.',
                document: 'Record the approved request reference, identity checks, required role, current provisioning state, reassignment, and target update.'
            },
            kb: { id: 'KB-033', title: 'New-starter identity and access workflow', summary: 'Verify identity, manager approval, role, store, and request status before routing access through the authorised fulfilment path.', keywords: 'new starter access identity account onboarding permissions employee' },
            noteKeywords: ['request', 'verified', 'role', 'identity', 'pending'],
            idealNote: 'Store 096 manager requested access for a new employee starting today. Verified employee ID, active HR record, approving manager, store, start date, and approved onboarding reference. Standard store role assignment remained pending. Followed KB-033 and reassigned to Identity Fulfilment with all verified details; team accepted with a 60-minute target. Manager advised not to share another user’s account.'
        },
        {
            id: 'RSD-105',
            queueTitle: 'Outlook not synchronising',
            title: 'Outlook desktop app is not updating',
            store: 'Fictional Support Office',
            channel: 'Chat',
            caller: 'Operations Coordinator',
            callerInitials: 'OC',
            reportedPriority: 'P3',
            correctPriority: 'P3',
            sla: '30 min',
            category: 'Microsoft 365 / Outlook',
            initialMessage: 'My Outlook desktop app has not received new mail since this morning, but colleagues are receiving messages.',
            questions: [
                { id: 'web', text: 'Can you access current mail in Outlook on the web?', response: 'Yes. New messages are visible in the web version.', useful: true, why: 'This confirms the mailbox and service are working and isolates the desktop client.' },
                { id: 'scope', text: 'Are any other users affected?', response: 'No. Two nearby colleagues are receiving mail normally.', useful: true, why: 'Single-user scope makes a wider service incident less likely.' },
                { id: 'status', text: 'Does Outlook show Offline, Disconnected, or an error?', response: 'The status bar says “Need Password.”', useful: true, why: 'Client status often identifies authentication or connection issues directly.' },
                { id: 'password', text: 'Was the account password changed recently?', response: 'Yes, I changed it yesterday after a password-expiry prompt.', useful: true, why: 'A recent credential change fits the displayed Need Password state.' },
                { id: 'inbox-count', text: 'Exactly how many emails are in the mailbox?', response: 'I am not sure, and the web mailbox opens normally.', useful: false, why: 'Mailbox item count does not help with the current authentication evidence.' },
                { id: 'forward', text: 'Can you auto-forward all email to a personal account?', response: 'No. That would not be appropriate.', useful: false, why: 'Forwarding business mail externally is not a safe troubleshooting step.' }
            ],
            actions: [
                { id: 'health', text: 'Check Microsoft 365 service health', detail: 'Rule out an active platform incident.', result: 'No relevant Exchange Online incident is reported.', useful: true },
                { id: 'web', text: 'Verify current mail in Outlook on the web', detail: 'Confirm mailbox access and recent delivery.', result: 'Web access works and current messages are present.', useful: true },
                { id: 'reauth', text: 'Use the approved sign-in prompt to refresh credentials', detail: 'Reauthenticate the managed desktop client using the current account password and MFA.', result: 'Authentication succeeds and Outlook changes from Need Password to Connected.', useful: true, critical: true, securityCritical: true },
                { id: 'sync', text: 'Run Send/Receive and confirm a test message', detail: 'Verify new mail flow before resolving.', result: 'A test message arrives in the desktop app successfully.', useful: true, critical: true },
                { id: 'disable-mfa', text: 'Disable MFA so Outlook signs in more easily', detail: 'Removing a security control is not an appropriate client troubleshooting step.', result: 'MFA must remain enabled.', useful: false, unsafe: true },
                { id: 'delete-profile', text: 'Delete the Outlook profile and local data immediately', detail: 'Destructive profile changes are premature before simple reauthentication and service checks.', result: 'This could remove cached data and is unnecessary at this stage.', useful: false, unsafe: true }
            ],
            securityRequiredIds: ['reauth'],
            decisions: [
                { id: 'resolve', text: 'Confirm the test email, document the credential refresh, and resolve the client incident', detail: 'The desktop client is connected and current mail flow is verified.', correct: true },
                { id: 'major', text: 'Declare a company-wide Microsoft 365 incident', detail: 'Web access and other users are working normally.', correct: false },
                { id: 'rebuild', text: 'Rebuild the user’s computer immediately', detail: 'The issue was resolved through proportionate authentication troubleshooting.', correct: false }
            ],
            communications: [
                { id: 'clear-update', text: '“Outlook needed your updated sign-in after yesterday’s password change. It is connected again and the test message arrived successfully. Your web mailbox remained available throughout.”', correct: true },
                { id: 'blame', text: '“You caused this by changing your password.”', correct: false },
                { id: 'technical', text: '“The cached authentication token was remediated. Closing.”', correct: false }
            ],
            hints: {
                triage: 'Compare desktop and web access, check whether others are affected, and read the client status before making changes.',
                investigate: 'The “Need Password” state and recent password change support a safe reauthentication path.',
                decide: 'Verify new mail flow after reconnecting; connection status alone is not a complete test.',
                document: 'Record user scope, web result, service health, client status, recent password change, reauthentication, and test outcome.'
            },
            kb: { id: 'KB-018', title: 'Outlook desktop sync and authentication', summary: 'Compare web and desktop access, check service health and client status, then use approved reauthentication before considering profile repair.', keywords: 'outlook email sync need password m365 authentication desktop' },
            noteKeywords: ['outlook', 'web', 'password', 'connected', 'test'],
            idealNote: 'Support Office user reported Outlook desktop not receiving mail since morning; no other users affected. Outlook on the web showed current mail and M365 service health was normal. Desktop status displayed Need Password following a password change yesterday. User completed approved reauthentication with MFA; client returned to Connected. Send/Receive completed and test message arrived successfully.'
        },
        {
            id: 'RSD-106',
            queueTitle: 'Several stores reporting POS errors',
            title: 'Multiple stores report the same payment error',
            store: 'Three fictional stores',
            channel: 'Queue alert',
            caller: 'Service Desk Queue',
            callerInitials: 'SD',
            reportedPriority: 'P3',
            correctPriority: 'P1',
            sla: '10 min',
            category: 'Major incident / Retail systems',
            initialMessage: 'Three stores have logged near-identical payment-processing errors within five minutes. New calls are arriving.',
            questions: [
                { id: 'count', text: 'How many stores and users are currently affected?', response: 'Three stores have confirmed the issue and two additional calls are waiting in queue.', useful: true, why: 'Growing multi-site scope is a strong major-incident signal.' },
                { id: 'error', text: 'Do the stores report the same error and start time?', response: 'Yes. Each reports “Payment service unavailable,” beginning between 14:03 and 14:06.', useful: true, why: 'A matching error and time window suggest one shared service failure.' },
                { id: 'workaround', text: 'Is an approved payment workaround available?', response: 'Stores can take limited cash sales, but normal card payments are unavailable.', useful: true, why: 'Workaround limits are essential for business-impact assessment.' },
                { id: 'change', text: 'Was a shared service change recorded today?', response: 'The change calendar shows a payment-gateway update completed at 13:55.', useful: true, why: 'A recent shared change is relevant evidence for the incident team.' },
                { id: 'individual', text: 'What colour is each store’s router light?', response: 'The stores can access other online services normally.', useful: false, why: 'Identical payment-only errors across stores make individual router checks a poor first focus.' },
                { id: 'close-calls', text: 'Can we ask stores to call back tomorrow?', response: 'More stores are calling and card payments remain unavailable.', useful: false, why: 'Deferring active multi-store trading impact is not appropriate.' }
            ],
            actions: [
                { id: 'correlate', text: 'Correlate tickets by error, service, and start time', detail: 'Establish whether separate reports belong to one parent incident.', result: 'Five stores now show the same payment-service error within a seven-minute window.', useful: true, critical: true },
                { id: 'status', text: 'Check service monitoring, changes, and known incidents', detail: 'Look for shared-service signals and recent change context.', result: 'Payment API health checks are failing; a gateway update completed eight minutes before the first report.', useful: true, critical: true },
                { id: 'parent', text: 'Create or identify a parent incident and link store tickets', detail: 'Keep impact, updates, and ownership coordinated.', result: 'A parent incident is created and all five store reports are linked.', useful: true },
                { id: 'major', text: 'Escalate through the major-incident process', detail: 'Provide scope, impact, error, timeline, monitoring, and recent-change evidence.', result: 'The incident manager and payment-platform team accept the P1 escalation.', useful: true, critical: true },
                { id: 'reboot-all', text: 'Ask every store to reboot all POS and network equipment', detail: 'A mass restart would disrupt stores and does not match a shared payment-service fault.', result: 'This could expand disruption without addressing the failing shared service.', useful: false, unsafe: true },
                { id: 'delete-duplicates', text: 'Delete the additional store tickets as duplicates', detail: 'Related tickets should be linked, not deleted, so impact and communications remain traceable.', result: 'Deleting records would remove valuable impact evidence and audit history.', useful: false, unsafe: true }
            ],
            decisions: [
                { id: 'major', text: 'Declare and coordinate a P1 major incident, link all reports, and issue scheduled store updates', detail: 'The growing multi-store payment failure requires central ownership and communication.', correct: true },
                { id: 'separate', text: 'Troubleshoot every store as an unrelated endpoint ticket', detail: 'The shared error, time, and service evidence indicate one common incident.', correct: false },
                { id: 'hold', text: 'Place all tickets on hold until more stores call', detail: 'The existing impact already meets the defined critical threshold.', correct: false }
            ],
            communications: [
                { id: 'clear-update', text: '“We are managing a critical payment-service incident affecting multiple stores. Your ticket is linked to the parent incident; cash remains the approved limited workaround. The next update will be issued in 15 minutes.”', correct: true },
                { id: 'individual', text: '“Please keep restarting the terminal until it works.”', correct: false },
                { id: 'promise', text: '“The update will be rolled back and everything will be fixed in five minutes.”', correct: false }
            ],
            hints: {
                triage: 'Look for common service, error, timing, and impact. Several matching store reports can be one incident rather than many.',
                investigate: 'Correlate before making local changes. Shared monitoring and change evidence are more useful than repeating endpoint checks.',
                decide: 'Major incidents need a parent record, clear ownership, linked child tickets, approved workaround information, and a communication cadence.',
                document: 'Capture affected-store count, growth, common error, time window, workaround, monitoring, change correlation, parent incident, owners, and next update.'
            },
            kb: { id: 'KB-001', title: 'Recognising and escalating a retail major incident', summary: 'Correlate multi-site reports, establish critical impact, create a parent incident, preserve child records, engage owners, and set an update cadence.', keywords: 'major incident multiple stores payment outage p1 correlation parent' },
            noteKeywords: ['multiple stores', 'payment', 'parent incident', 'linked', 'update'],
            idealNote: 'Between 14:03 and 14:10, five stores reported the identical “Payment service unavailable” error; card payments unavailable with limited cash-only workaround. Correlated reports to failing payment API monitoring and a gateway change completed at 13:55. Raised P1 parent incident, linked all store tickets, and escalated to the incident manager and payment-platform team. Stores advised of approved workaround and 15-minute update cadence.'
        }
    ];

    const additionalKnowledge = [
        { id: 'KB-004', title: 'Writing useful service desk work notes', summary: 'Record impact, scope, evidence, actions, results, user communication, ownership, and the next expected step.', keywords: 'notes documentation ticket worklog handover' },
        { id: 'KB-011', title: 'Retail incident priority guide', summary: 'Priority reflects business impact and urgency—not how strongly a caller asks for help.', keywords: 'priority p1 p2 p3 p4 impact urgency sla' },
        { id: 'KB-026', title: 'Safe remote troubleshooting principles', summary: 'Start with reversible checks, preserve working services, protect credentials, and obtain authorisation before disruptive actions.', keywords: 'safe troubleshooting security authorisation remote support' }
    ];

    const knowledgeBase = [...scenarios.map((scenario) => scenario.kb), ...additionalKnowledge];
    const stageOrder = ['triage', 'investigate', 'decide', 'document'];
    const modeLabels = {
        guided: 'Guided practice',
        practice: 'Independent practice',
        shift: 'Shift simulation'
    };
    const modeButtonLabels = {
        guided: 'Start guided practice',
        practice: 'Start independent practice',
        shift: 'Start shift simulation'
    };
    const storageKey = 'retail-service-desk-lab-progress-v1';

    const elements = {
        root: document.documentElement,
        themeToggle: document.querySelector('[data-theme-toggle]'),
        themeMeta: document.querySelector('meta[name="theme-color"]'),
        setup: document.querySelector('[data-setup]'),
        simulator: document.querySelector('[data-simulator]'),
        modeButtons: [...document.querySelectorAll('[data-mode]')],
        startButton: document.querySelector('[data-start]'),
        changeMode: document.querySelector('[data-change-mode]'),
        modeLabel: document.querySelector('[data-mode-label]'),
        completedCount: document.querySelector('[data-completed-count]'),
        bestAverage: document.querySelector('[data-best-average]'),
        timerWrap: document.querySelector('[data-timer-wrap]'),
        shiftTimer: document.querySelector('[data-shift-timer]'),
        ticketList: document.querySelector('[data-ticket-list]'),
        openCount: document.querySelector('[data-open-count]'),
        resetProgress: document.querySelector('[data-reset-progress]'),
        ticketId: document.querySelector('[data-ticket-id]'),
        channel: document.querySelector('[data-channel]'),
        ticketStatus: document.querySelector('[data-ticket-status]'),
        store: document.querySelector('[data-store]'),
        ticketTitle: document.querySelector('[data-ticket-title]'),
        sla: document.querySelector('[data-sla]'),
        caller: document.querySelector('[data-caller]'),
        callerAvatar: document.querySelector('.caller-avatar'),
        initialMessage: document.querySelector('[data-initial-message]'),
        stageButtons: [...document.querySelectorAll('[data-stage-button]')],
        stageContent: document.querySelector('[data-stage-content]'),
        coachHint: document.querySelector('[data-coach-hint]'),
        kbTitle: document.querySelector('[data-kb-title]'),
        kbSummary: document.querySelector('[data-kb-summary]'),
        kbForm: document.querySelector('[data-kb-search-form]'),
        kbInput: document.querySelector('[data-kb-search-input]'),
        kbResults: document.querySelector('[data-kb-results]'),
        activityLog: document.querySelector('[data-activity-log]'),
        activityCount: document.querySelector('[data-activity-count]'),
        feedbackOverlay: document.querySelector('[data-feedback-overlay]'),
        feedbackModal: document.querySelector('[data-feedback-modal]'),
        closeFeedback: document.querySelector('[data-close-feedback]'),
        finalScore: document.querySelector('[data-final-score]'),
        feedbackTitle: document.querySelector('[data-feedback-title]'),
        feedbackSummary: document.querySelector('[data-feedback-summary]'),
        scoreBreakdown: document.querySelector('[data-score-breakdown]'),
        strengths: document.querySelector('[data-strengths]'),
        improvements: document.querySelector('[data-improvements]'),
        idealNote: document.querySelector('[data-ideal-note]'),
        retryTicket: document.querySelector('[data-retry-ticket]'),
        nextTicket: document.querySelector('[data-next-ticket]')
    };

    const state = {
        selectedMode: 'guided',
        mode: 'guided',
        queue: scenarios.map((scenario) => scenario.id),
        currentId: scenarios[0].id,
        tickets: new Map(),
        sessionCompleted: new Set(),
        progress: loadProgress(),
        shiftStartedAt: 0,
        shiftTimerId: 0,
        lastFocused: null
    };

    function escapeHTML(value = '') {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function clamp(number, minimum, maximum) {
        return Math.min(Math.max(number, minimum), maximum);
    }

    function loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey));
            if (saved && typeof saved === 'object' && saved.tickets) return saved;
        } catch (error) {
            // The simulator continues without persistent progress.
        }
        return { tickets: {} };
    }

    function saveProgress() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(state.progress));
        } catch (error) {
            // Progress remains available for the current session.
        }
    }

    function applyTheme(theme, save = false) {
        const nextTheme = theme === 'dark' ? 'dark' : 'light';
        elements.root.dataset.theme = nextTheme;
        elements.themeMeta.content = nextTheme === 'dark' ? '#07111f' : '#f4f8fa';
        elements.themeToggle.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} theme`);
        elements.themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
        if (save) {
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (error) {
                // The theme remains active for the current page.
            }
        }
    }

    function getScenario(id = state.currentId) {
        return scenarios.find((scenario) => scenario.id === id);
    }

    function createTicketState() {
        return {
            stage: 'triage',
            maxStage: 0,
            priority: '',
            asked: [],
            actions: [],
            actionsRun: false,
            decision: '',
            communication: '',
            workNotes: '',
            resolutionNotes: '',
            activity: [],
            completed: false,
            feedback: null,
            score: null
        };
    }

    function getTicketState(id = state.currentId) {
        if (!state.tickets.has(id)) state.tickets.set(id, createTicketState());
        return state.tickets.get(id);
    }

    function shuffle(items) {
        const copy = [...items];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
        }
        return copy;
    }

    function selectMode(mode) {
        if (!modeLabels[mode]) return;
        state.selectedMode = mode;
        elements.modeButtons.forEach((button) => {
            const selected = button.dataset.mode === mode;
            button.classList.toggle('is-selected', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        elements.startButton.firstChild.textContent = `${modeButtonLabels[mode]} `;
    }

    function startSession() {
        stopShiftTimer();
        state.mode = state.selectedMode;
        state.queue = state.mode === 'shift'
            ? shuffle(scenarios.map((scenario) => scenario.id)).slice(0, 5)
            : scenarios.map((scenario) => scenario.id);
        state.currentId = state.queue[0];
        state.tickets = new Map();
        state.sessionCompleted = new Set();
        elements.modeLabel.textContent = modeLabels[state.mode];
        elements.setup.hidden = true;
        elements.simulator.hidden = false;
        elements.timerWrap.hidden = state.mode !== 'shift';
        if (state.mode === 'shift') startShiftTimer();
        selectTicket(state.currentId);
        elements.simulator.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    function changeMode() {
        stopShiftTimer();
        elements.simulator.hidden = true;
        elements.setup.hidden = false;
        elements.setup.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    function startShiftTimer() {
        state.shiftStartedAt = Date.now();
        updateShiftTimer();
        state.shiftTimerId = window.setInterval(updateShiftTimer, 1000);
    }

    function stopShiftTimer() {
        if (state.shiftTimerId) window.clearInterval(state.shiftTimerId);
        state.shiftTimerId = 0;
    }

    function updateShiftTimer() {
        if (!state.shiftStartedAt) return;
        const totalSeconds = Math.floor((Date.now() - state.shiftStartedAt) / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        elements.shiftTimer.textContent = `${minutes}:${seconds}`;
    }

    function selectTicket(id) {
        if (!state.queue.includes(id)) return;
        state.currentId = id;
        const ticketState = getTicketState(id);
        if (ticketState.completed) {
            ticketState.stage = 'document';
            ticketState.maxStage = 3;
        }
        renderAll();
        if (window.innerWidth < 980) elements.ticketTitle.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    function renderAll() {
        renderQueue();
        renderSessionStats();
        renderTicketHeader();
        renderStageTabs();
        renderStage();
        renderCoach();
        renderActivity();
    }

    function renderQueue() {
        elements.ticketList.innerHTML = state.queue.map((id) => {
            const scenario = getScenario(id);
            const ticketState = state.tickets.get(id);
            const active = id === state.currentId;
            const completed = state.sessionCompleted.has(id);
            const saved = state.progress.tickets[id];
            let result = '';
            if (completed) result = `✓ ${ticketState?.score ?? saved?.lastScore ?? 0}`;
            else if (saved?.bestScore) result = `Best ${saved.bestScore}`;
            return `
                <button class="queue-ticket${active ? ' is-active' : ''}${completed ? ' is-complete' : ''}" type="button" data-queue-ticket="${scenario.id}"${active ? ' aria-current="true"' : ''}>
                    <span class="queue-ticket__priority queue-ticket__priority--${scenario.reportedPriority.toLowerCase()}" title="Reported priority">${scenario.reportedPriority}</span>
                    <span class="queue-ticket__copy">
                        <small>${scenario.id} · ${escapeHTML(scenario.store)}</small>
                        <strong>${escapeHTML(scenario.queueTitle)}</strong>
                        <span>${escapeHTML(scenario.category)}</span>
                    </span>
                    <span class="queue-ticket__result">${escapeHTML(result)}</span>
                </button>`;
        }).join('');
    }

    function renderSessionStats() {
        const completed = state.sessionCompleted.size;
        const total = state.queue.length;
        elements.completedCount.textContent = `${completed}/${total}`;
        elements.openCount.textContent = `${total - completed} open`;
        const scores = state.queue
            .map((id) => state.progress.tickets[id]?.bestScore)
            .filter((score) => Number.isFinite(score));
        elements.bestAverage.textContent = scores.length
            ? `${Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)}%`
            : '—';
    }

    function renderTicketHeader() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        elements.ticketId.textContent = scenario.id;
        elements.channel.textContent = scenario.channel;
        elements.store.textContent = scenario.store;
        elements.ticketTitle.textContent = scenario.title;
        elements.sla.textContent = scenario.sla;
        elements.caller.textContent = scenario.caller;
        elements.callerAvatar.textContent = scenario.callerInitials;
        elements.initialMessage.textContent = `“${scenario.initialMessage}”`;
        elements.ticketStatus.textContent = ticketState.completed ? `Completed · ${ticketState.score}/100` : 'In progress';
        elements.ticketStatus.classList.toggle('is-complete', ticketState.completed);
    }

    function renderStageTabs() {
        const ticketState = getTicketState();
        elements.stageButtons.forEach((button, index) => {
            const stage = button.dataset.stageButton;
            const active = stage === ticketState.stage;
            const complete = index < ticketState.maxStage || ticketState.completed;
            button.classList.toggle('is-active', active);
            button.classList.toggle('is-complete', complete && !active);
            button.disabled = index > ticketState.maxStage;
            if (active) button.setAttribute('aria-current', 'step');
            else button.removeAttribute('aria-current');
        });
    }

    function stageHeading(title, description, progress) {
        return `
            <div class="stage-heading">
                <div><h4>${escapeHTML(title)}</h4><p>${escapeHTML(description)}</p></div>
                <span class="stage-progress">${escapeHTML(progress)}</span>
            </div>`;
    }

    function renderStage() {
        const ticketState = getTicketState();
        if (ticketState.stage === 'triage') renderTriage();
        if (ticketState.stage === 'investigate') renderInvestigate();
        if (ticketState.stage === 'decide') renderDecide();
        if (ticketState.stage === 'document') renderDocument();
    }

    function renderTriage() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        const askedEntries = scenario.questions.filter((question) => ticketState.asked.includes(question.id));
        const priorityOptions = Object.entries(priorityGuide).map(([key, priority]) => `
            <label class="priority-option">
                <input type="radio" name="priority-${scenario.id}" value="${key}" data-priority${ticketState.priority === key ? ' checked' : ''}>
                <span><strong>${escapeHTML(priority.label)}</strong><small>${escapeHTML(priority.description)}</small></span>
            </label>`).join('');
        const questions = scenario.questions.map((question, index) => {
            const asked = ticketState.asked.includes(question.id);
            const recommended = state.mode === 'guided' && question.useful;
            return `
                <button class="question-button${asked ? ' is-asked' : ''}${recommended ? ' is-recommended' : ''}" type="button" data-question-id="${question.id}"${asked ? ' disabled' : ''}>
                    <span class="question-button__number">${String(index + 1).padStart(2, '0')}</span>
                    <span class="question-button__text">${escapeHTML(question.text)}</span>
                    <span class="question-button__check">${asked ? '✓' : '›'}</span>
                </button>`;
        }).join('');
        const conversation = askedEntries.map((question) => `
            <div class="conversation-entry">
                <strong>Caller response</strong>
                <p>${escapeHTML(question.response)}</p>
                ${state.mode === 'guided' ? `<small>${escapeHTML(question.why)}</small>` : ''}
            </div>`).join('');

        elements.stageContent.innerHTML = `
            ${stageHeading('Triage the incoming report', 'Validate the reported priority and ask focused questions before changing anything.', `${ticketState.asked.length} questions asked`)}
            <fieldset class="decision-group">
                <legend>Choose a priority <span>The queue currently reports ${scenario.reportedPriority}</span></legend>
                <div class="priority-grid">${priorityOptions}</div>
            </fieldset>
            <div class="decision-group">
                <p class="group-label">Questions for the caller <span>Ask at least two</span></p>
                <div class="question-list">${questions}</div>
                ${conversation ? `<div class="conversation-log">${conversation}</div>` : ''}
            </div>
            <p class="validation-message" data-validation hidden></p>
            <div class="stage-actions">
                <p>Good triage confirms impact, scope, symptoms, timing, and recent change.</p>
                <div class="stage-actions__buttons"><button class="primary-button" type="button" data-continue-triage>Continue to investigate <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14 0M13 6l6 6-6 6"></path></svg></button></div>
            </div>`;
    }

    function renderInvestigate() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        const actions = scenario.actions.map((action) => `
            <label class="action-option">
                <input type="checkbox" value="${action.id}" data-diagnostic-action${ticketState.actions.includes(action.id) ? ' checked' : ''}>
                <span>
                    <span class="option-marker">✓</span>
                    <span class="option-copy"><strong>${escapeHTML(action.text)}</strong><small>${escapeHTML(action.detail)}</small></span>
                </span>
            </label>`).join('');
        const selectedResults = ticketState.actionsRun
            ? scenario.actions.filter((action) => ticketState.actions.includes(action.id)).map((action) => `
                <div class="diagnostic-result">
                    <span>i</span>
                    <div><strong>${escapeHTML(action.text)}</strong><p>${escapeHTML(action.result)}</p></div>
                </div>`).join('')
            : '';

        elements.stageContent.innerHTML = `
            ${stageHeading('Choose your diagnostic actions', 'Select the checks you would perform. Safe, proportionate and evidence-based actions score best.', `${ticketState.actions.length} selected`)}
            <fieldset class="decision-group">
                <legend>Available actions <span>Select at least two</span></legend>
                <div class="action-grid">${actions}</div>
            </fieldset>
            ${selectedResults ? `<div class="decision-group"><p class="group-label">Diagnostic results <span>Read these before deciding</span></p><div class="diagnostic-results">${selectedResults}</div></div>` : ''}
            <p class="validation-message" data-validation hidden></p>
            <div class="stage-actions">
                <button class="secondary-button" type="button" data-back-stage="triage">Back to triage</button>
                <div class="stage-actions__buttons">
                    <button class="secondary-button" type="button" data-run-actions>${ticketState.actionsRun ? 'Run updated checks' : 'Run selected checks'}</button>
                    <button class="primary-button" type="button" data-continue-investigate${ticketState.actionsRun ? '' : ' disabled'}>Continue to decision <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14 0M13 6l6 6-6 6"></path></svg></button>
                </div>
            </div>`;
    }

    function renderDecide() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        const decisions = scenario.decisions.map((decision) => `
            <label class="choice-card">
                <input type="radio" name="decision-${scenario.id}" value="${decision.id}" data-decision${ticketState.decision === decision.id ? ' checked' : ''}>
                <span><span class="option-marker">✓</span><span class="option-copy"><strong>${escapeHTML(decision.text)}</strong><small>${escapeHTML(decision.detail)}</small></span></span>
            </label>`).join('');
        const communications = scenario.communications.map((communication) => `
            <label class="communication-card">
                <input type="radio" name="communication-${scenario.id}" value="${communication.id}" data-communication${ticketState.communication === communication.id ? ' checked' : ''}>
                <span><span class="option-marker">✓</span><span class="option-copy"><strong>${escapeHTML(communication.text)}</strong></span></span>
            </label>`).join('');

        elements.stageContent.innerHTML = `
            ${stageHeading('Decide what happens next', 'Choose the outcome that matches the evidence, then give the user a clear and realistic update.', '2 decisions required')}
            <fieldset class="decision-group">
                <legend>Resolution or escalation decision <span>Choose one</span></legend>
                <div class="choice-list">${decisions}</div>
            </fieldset>
            <fieldset class="decision-group">
                <legend>Update to the user <span>Choose one</span></legend>
                <div class="communication-list">${communications}</div>
            </fieldset>
            <p class="validation-message" data-validation hidden></p>
            <div class="stage-actions">
                <button class="secondary-button" type="button" data-back-stage="investigate">Back to investigation</button>
                <div class="stage-actions__buttons"><button class="primary-button" type="button" data-continue-decide>Continue to notes <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14 0M13 6l6 6-6 6"></path></svg></button></div>
            </div>`;
    }

    function renderDocument() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        const selectedDecision = scenario.decisions.find((decision) => decision.id === ticketState.decision);
        elements.stageContent.innerHTML = `
            ${stageHeading('Document the ticket', 'Write notes that another analyst or escalation team could understand without asking you to repeat the investigation.', ticketState.completed ? `Completed · ${ticketState.score}/100` : 'Final stage')}
            <div class="ticket-review-card">
                <div><small>Chosen priority</small><strong>${escapeHTML(ticketState.priority || 'Not selected')}</strong></div>
                <div><small>Checks performed</small><strong>${ticketState.actions.length}</strong></div>
                <div><small>Outcome</small><strong>${escapeHTML(selectedDecision?.text || 'Not selected')}</strong></div>
            </div>
            <div class="notes-grid">
                <div class="field">
                    <label for="work-notes">Work notes <span>What you found and did</span></label>
                    <textarea id="work-notes" data-work-notes placeholder="Impact, scope, questions, checks, results and escalation details…"${ticketState.completed ? ' disabled' : ''}>${escapeHTML(ticketState.workNotes)}</textarea>
                    <span class="character-count" data-work-count>${ticketState.workNotes.length} characters</span>
                </div>
                <div class="field">
                    <label for="resolution-notes">Resolution / handover note <span>Outcome and next step</span></label>
                    <textarea id="resolution-notes" data-resolution-notes placeholder="Service status, user confirmation, ownership and follow-up…"${ticketState.completed ? ' disabled' : ''}>${escapeHTML(ticketState.resolutionNotes)}</textarea>
                    <span class="character-count" data-resolution-count>${ticketState.resolutionNotes.length} characters</span>
                </div>
            </div>
            <p class="validation-message" data-validation hidden></p>
            <div class="stage-actions">
                <button class="secondary-button" type="button" data-back-stage="decide">Back to decision</button>
                <div class="stage-actions__buttons">
                    ${ticketState.completed
                        ? '<button class="primary-button" type="button" data-view-feedback>View ticket feedback</button>'
                        : '<button class="primary-button" type="button" data-submit-ticket>Submit ticket for review <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14 0M13 6l6 6-6 6"></path></svg></button>'}
                </div>
            </div>`;
    }

    function renderCoach() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        const hintParagraph = elements.coachHint.querySelector('p');
        const hintLabel = elements.coachHint.querySelector('small');
        if (state.mode === 'guided') {
            elements.coachHint.classList.remove('is-hidden-hint');
            hintLabel.textContent = 'Current hint';
            hintParagraph.textContent = scenario.hints[ticketState.stage];
        } else {
            elements.coachHint.classList.add('is-hidden-hint');
            hintLabel.textContent = state.mode === 'shift' ? 'Shift mode' : 'Practice mode';
            hintParagraph.textContent = 'Hints are hidden. Complete the ticket to receive detailed coaching feedback.';
        }
        elements.kbTitle.textContent = scenario.kb.title;
        elements.kbSummary.textContent = scenario.kb.summary;
    }

    function renderActivity() {
        const ticketState = getTicketState();
        elements.activityCount.textContent = `${ticketState.activity.length} ${ticketState.activity.length === 1 ? 'action' : 'actions'}`;
        elements.activityLog.innerHTML = ticketState.activity.length
            ? ticketState.activity.map((activity) => `<li>${escapeHTML(activity)}</li>`).join('')
            : '<li class="activity-log__empty">Your decisions will appear here.</li>';
    }

    function addActivity(message) {
        const ticketState = getTicketState();
        ticketState.activity.unshift(message);
        ticketState.activity = ticketState.activity.slice(0, 12);
        renderActivity();
    }

    function showValidation(message) {
        const target = elements.stageContent.querySelector('[data-validation]');
        if (!target) return;
        target.textContent = message;
        target.hidden = false;
        target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function goToStage(stage) {
        const ticketState = getTicketState();
        const index = stageOrder.indexOf(stage);
        if (index < 0 || index > ticketState.maxStage) return;
        ticketState.stage = stage;
        renderStageTabs();
        renderStage();
        renderCoach();
        elements.stageContent.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function continueFromTriage() {
        const ticketState = getTicketState();
        if (!ticketState.priority) {
            showValidation('Choose a priority before continuing.');
            return;
        }
        if (ticketState.asked.length < 2) {
            showValidation('Ask at least two focused questions before continuing.');
            return;
        }
        ticketState.maxStage = Math.max(ticketState.maxStage, 1);
        ticketState.stage = 'investigate';
        addActivity(`Triage completed with ${ticketState.priority} and ${ticketState.asked.length} caller questions.`);
        renderStageTabs();
        renderStage();
        renderCoach();
    }

    function runDiagnosticActions() {
        const ticketState = getTicketState();
        if (ticketState.actions.length < 2) {
            showValidation('Select at least two diagnostic actions to run.');
            return;
        }
        ticketState.actionsRun = true;
        addActivity(`Ran ${ticketState.actions.length} diagnostic actions and reviewed the results.`);
        renderStage();
    }

    function continueFromInvestigation() {
        const ticketState = getTicketState();
        if (!ticketState.actionsRun) {
            showValidation('Run your selected checks and review the results first.');
            return;
        }
        ticketState.maxStage = Math.max(ticketState.maxStage, 2);
        ticketState.stage = 'decide';
        addActivity('Investigation completed; moving to resolution or escalation decision.');
        renderStageTabs();
        renderStage();
        renderCoach();
    }

    function continueFromDecision() {
        const ticketState = getTicketState();
        if (!ticketState.decision || !ticketState.communication) {
            showValidation('Choose both an outcome and a user update before continuing.');
            return;
        }
        ticketState.maxStage = Math.max(ticketState.maxStage, 3);
        ticketState.stage = 'document';
        addActivity('Outcome and user communication selected; ticket ready for documentation.');
        renderStageTabs();
        renderStage();
        renderCoach();
    }

    function calculateScore(scenario, ticketState) {
        const usefulQuestions = scenario.questions.filter((question) => question.useful);
        const askedUseful = usefulQuestions.filter((question) => ticketState.asked.includes(question.id)).length;
        const askedWeak = scenario.questions.filter((question) => !question.useful && ticketState.asked.includes(question.id)).length;
        const questionScore = clamp(Math.round((askedUseful / usefulQuestions.length) * 10 - askedWeak * 2), 0, 10);
        const triage = (ticketState.priority === scenario.correctPriority ? 15 : 4) + questionScore;

        const usefulActions = scenario.actions.filter((action) => action.useful);
        const selectedUseful = usefulActions.filter((action) => ticketState.actions.includes(action.id)).length;
        const selectedWeak = scenario.actions.filter((action) => !action.useful && !action.unsafe && ticketState.actions.includes(action.id)).length;
        const selectedUnsafe = scenario.actions.filter((action) => action.unsafe && ticketState.actions.includes(action.id));
        const correctDecision = scenario.decisions.find((decision) => decision.id === ticketState.decision)?.correct === true;
        const actionScore = clamp(Math.round((selectedUseful / usefulActions.length) * 20 - selectedWeak * 2 - selectedUnsafe.length * 3), 0, 20);
        const troubleshooting = clamp(actionScore + (correctDecision ? 10 : 2), 0, 30);

        const missingSecurity = (scenario.securityRequiredIds || []).filter((id) => !ticketState.actions.includes(id)).length;
        const security = clamp(15 - selectedUnsafe.length * 8 - missingSecurity * 5, 0, 15);
        const communicationCorrect = scenario.communications.find((option) => option.id === ticketState.communication)?.correct === true;
        const communication = communicationCorrect ? 15 : 6;

        const combinedNotes = `${ticketState.workNotes} ${ticketState.resolutionNotes}`.toLowerCase();
        const keywordMatches = scenario.noteKeywords.filter((keyword) => combinedNotes.includes(keyword.toLowerCase())).length;
        const workScore = ticketState.workNotes.length >= 100 ? 7 : ticketState.workNotes.length >= 50 ? 5 : 2;
        const resolutionScore = ticketState.resolutionNotes.length >= 70 ? 6 : ticketState.resolutionNotes.length >= 30 ? 4 : 2;
        const documentation = clamp(workScore + resolutionScore + Math.min(2, keywordMatches), 0, 15);

        const breakdown = { triage, troubleshooting, security, communication, documentation };
        const total = Object.values(breakdown).reduce((sum, score) => sum + score, 0);
        return {
            total,
            breakdown,
            context: {
                askedUseful,
                usefulQuestionCount: usefulQuestions.length,
                selectedUseful,
                usefulActionCount: usefulActions.length,
                selectedUnsafe,
                correctDecision,
                communicationCorrect,
                keywordMatches
            }
        };
    }

    function buildFeedback(scenario, ticketState) {
        const score = calculateScore(scenario, ticketState);
        const strengths = [];
        const improvements = [];
        const context = score.context;

        if (ticketState.priority === scenario.correctPriority) strengths.push(`You correctly classified the ticket as ${scenario.correctPriority}.`);
        else improvements.push(`The strongest priority was ${scenario.correctPriority}, based on the defined business impact and workaround.`);

        if (context.askedUseful >= Math.ceil(context.usefulQuestionCount * 0.65)) strengths.push('Your caller questions established useful scope and diagnostic context.');
        else improvements.push('Ask more questions about scope, impact, exact symptoms, timing, and recent change.');

        if (context.selectedUseful >= Math.ceil(context.usefulActionCount * 0.65)) strengths.push('Your investigation included several evidence-based diagnostic actions.');
        else improvements.push('Use more of the safe checks that directly match the evidence collected.');

        if (context.selectedUnsafe.length === 0) strengths.push('You avoided disruptive or insecure troubleshooting actions.');
        else improvements.push(`Avoid: ${context.selectedUnsafe.map((action) => action.text).join('; ')}.`);

        if (context.correctDecision) strengths.push('Your resolution or escalation decision matched the evidence.');
        else improvements.push('Choose an outcome that reflects the verified scope, service state, and ownership required.');

        if (context.communicationCorrect) strengths.push('Your user update was clear, realistic, and included the next step.');
        else improvements.push('Give the user an outcome, current owner, practical next step, and realistic update time without guarantees.');

        if (score.breakdown.documentation >= 11) strengths.push('Your notes contained useful detail for handover and audit history.');
        else improvements.push('Strengthen the notes with impact, evidence, actions, results, user confirmation, ownership, and next update.');

        const summary = score.total >= 85
            ? 'Strong service desk judgement. Your decisions were safe, evidence-based, and clearly communicated.'
            : score.total >= 70
                ? 'A solid attempt with good fundamentals. Review the coaching points to make your response more consistent.'
                : score.total >= 50
                    ? 'You reached an outcome, but some decisions increased risk or missed important context. Use the coaching notes and retry.'
                    : 'This ticket needs another pass. Focus first on scope, business impact, safe checks, and clear escalation evidence.';

        return {
            ...score,
            summary,
            strengths: strengths.slice(0, 4),
            improvements: improvements.slice(0, 4)
        };
    }

    function completeTicket() {
        const scenario = getScenario();
        const ticketState = getTicketState();
        if (ticketState.workNotes.trim().length < 50 || ticketState.resolutionNotes.trim().length < 30) {
            showValidation('Write at least 50 characters of work notes and 30 characters of resolution or handover notes.');
            return;
        }
        ticketState.feedback = buildFeedback(scenario, ticketState);
        ticketState.score = ticketState.feedback.total;
        ticketState.completed = true;
        state.sessionCompleted.add(scenario.id);
        addActivity(`Ticket submitted for review with a score of ${ticketState.score}/100.`);

        const previous = state.progress.tickets[scenario.id] || { bestScore: 0, attempts: 0, lastScore: 0 };
        state.progress.tickets[scenario.id] = {
            bestScore: Math.max(previous.bestScore || 0, ticketState.score),
            attempts: (previous.attempts || 0) + 1,
            lastScore: ticketState.score
        };
        saveProgress();
        if (state.mode === 'shift' && state.sessionCompleted.size === state.queue.length) stopShiftTimer();
        renderAll();
        openFeedback(ticketState.feedback);
    }

    function nextUncompletedTicket() {
        const currentIndex = state.queue.indexOf(state.currentId);
        const ordered = [...state.queue.slice(currentIndex + 1), ...state.queue.slice(0, currentIndex)];
        return ordered.find((id) => !state.sessionCompleted.has(id)) || null;
    }

    function openFeedback(feedback) {
        const scenario = getScenario();
        state.lastFocused = document.activeElement;
        elements.finalScore.textContent = feedback.total;
        elements.feedbackTitle.textContent = `${scenario.id} completed`;
        elements.feedbackSummary.textContent = feedback.summary;
        const breakdownConfig = [
            ['Triage', feedback.breakdown.triage, 25],
            ['Troubleshooting', feedback.breakdown.troubleshooting, 30],
            ['Security', feedback.breakdown.security, 15],
            ['Communication', feedback.breakdown.communication, 15],
            ['Documentation', feedback.breakdown.documentation, 15]
        ];
        elements.scoreBreakdown.innerHTML = breakdownConfig.map(([label, score, maximum]) => `
            <div class="score-item"><small>${escapeHTML(label)}</small><strong>${score}</strong><span>of ${maximum}</span></div>`).join('');
        elements.strengths.innerHTML = feedback.strengths.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
        elements.improvements.innerHTML = feedback.improvements.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
        elements.idealNote.textContent = scenario.idealNote;
        const nextId = nextUncompletedTicket();
        elements.nextTicket.firstChild.textContent = nextId ? 'Next ticket ' : state.mode === 'shift' ? 'Finish shift ' : 'Review queue ';
        elements.feedbackOverlay.hidden = false;
        document.body.classList.add('modal-open');
        elements.feedbackModal.focus();
    }

    function closeFeedback() {
        elements.feedbackOverlay.hidden = true;
        document.body.classList.remove('modal-open');
        if (state.lastFocused instanceof HTMLElement) state.lastFocused.focus();
    }

    function retryCurrentTicket() {
        closeFeedback();
        state.tickets.set(state.currentId, createTicketState());
        state.sessionCompleted.delete(state.currentId);
        renderAll();
    }

    function continueToNextTicket() {
        const nextId = nextUncompletedTicket();
        closeFeedback();
        if (nextId) {
            selectTicket(nextId);
            return;
        }
        elements.modeLabel.textContent = state.mode === 'shift' ? 'Shift complete' : `${modeLabels[state.mode]} complete`;
        elements.simulator.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    function searchKnowledgeBase(query) {
        const normalized = query.trim().toLowerCase();
        if (normalized.length < 2) {
            elements.kbResults.hidden = true;
            elements.kbResults.innerHTML = '';
            return;
        }
        const matches = knowledgeBase.filter((article) => `${article.id} ${article.title} ${article.summary} ${article.keywords}`.toLowerCase().includes(normalized)).slice(0, 4);
        elements.kbResults.innerHTML = matches.length
            ? matches.map((article) => `<li><button type="button" data-kb-id="${article.id}"><strong>${article.id}</strong> · ${escapeHTML(article.title)}</button></li>`).join('')
            : '<li><button type="button" disabled>No matching article</button></li>';
        elements.kbResults.hidden = false;
    }

    function openKnowledgeArticle(id) {
        const article = knowledgeBase.find((item) => item.id === id);
        if (!article) return;
        elements.kbTitle.textContent = `${article.id} · ${article.title}`;
        elements.kbSummary.textContent = article.summary;
        elements.kbResults.hidden = true;
        addActivity(`Opened knowledge article ${article.id}: ${article.title}.`);
    }

    elements.themeToggle.addEventListener('click', () => {
        applyTheme(elements.root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });

    elements.modeButtons.forEach((button) => {
        button.addEventListener('click', () => selectMode(button.dataset.mode));
    });

    elements.startButton.addEventListener('click', startSession);
    elements.changeMode.addEventListener('click', changeMode);

    elements.ticketList.addEventListener('click', (event) => {
        const button = event.target.closest('[data-queue-ticket]');
        if (button) selectTicket(button.dataset.queueTicket);
    });

    elements.stageButtons.forEach((button) => {
        button.addEventListener('click', () => goToStage(button.dataset.stageButton));
    });

    elements.stageContent.addEventListener('change', (event) => {
        const ticketState = getTicketState();
        if (event.target.matches('[data-priority]')) ticketState.priority = event.target.value;
        if (event.target.matches('[data-diagnostic-action]')) {
            ticketState.actions = [...elements.stageContent.querySelectorAll('[data-diagnostic-action]:checked')].map((input) => input.value);
            ticketState.actionsRun = false;
            const continueButton = elements.stageContent.querySelector('[data-continue-investigate]');
            if (continueButton) continueButton.disabled = true;
        }
        if (event.target.matches('[data-decision]')) ticketState.decision = event.target.value;
        if (event.target.matches('[data-communication]')) ticketState.communication = event.target.value;
    });

    elements.stageContent.addEventListener('input', (event) => {
        const ticketState = getTicketState();
        if (event.target.matches('[data-work-notes]')) {
            ticketState.workNotes = event.target.value;
            const count = elements.stageContent.querySelector('[data-work-count]');
            if (count) count.textContent = `${ticketState.workNotes.length} characters`;
        }
        if (event.target.matches('[data-resolution-notes]')) {
            ticketState.resolutionNotes = event.target.value;
            const count = elements.stageContent.querySelector('[data-resolution-count]');
            if (count) count.textContent = `${ticketState.resolutionNotes.length} characters`;
        }
    });

    elements.stageContent.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const scenario = getScenario();
        const ticketState = getTicketState();

        if (button.dataset.questionId) {
            if (!ticketState.asked.includes(button.dataset.questionId)) {
                ticketState.asked.push(button.dataset.questionId);
                const question = scenario.questions.find((item) => item.id === button.dataset.questionId);
                addActivity(`Asked caller: ${question.text}`);
                renderStage();
            }
            return;
        }
        if (button.hasAttribute('data-continue-triage')) continueFromTriage();
        if (button.hasAttribute('data-run-actions')) runDiagnosticActions();
        if (button.hasAttribute('data-continue-investigate')) continueFromInvestigation();
        if (button.hasAttribute('data-continue-decide')) continueFromDecision();
        if (button.dataset.backStage) goToStage(button.dataset.backStage);
        if (button.hasAttribute('data-submit-ticket')) completeTicket();
        if (button.hasAttribute('data-view-feedback') && ticketState.feedback) openFeedback(ticketState.feedback);
    });

    elements.kbForm.addEventListener('submit', (event) => {
        event.preventDefault();
        searchKnowledgeBase(elements.kbInput.value);
    });

    elements.kbInput.addEventListener('input', () => searchKnowledgeBase(elements.kbInput.value));

    elements.kbResults.addEventListener('click', (event) => {
        const button = event.target.closest('[data-kb-id]');
        if (button) openKnowledgeArticle(button.dataset.kbId);
    });

    elements.resetProgress.addEventListener('click', () => {
        const confirmed = window.confirm('Reset all saved scores and attempts for this training lab?');
        if (!confirmed) return;
        state.progress = { tickets: {} };
        state.tickets = new Map();
        state.sessionCompleted = new Set();
        saveProgress();
        selectTicket(state.queue[0]);
    });

    elements.closeFeedback.addEventListener('click', closeFeedback);
    elements.retryTicket.addEventListener('click', retryCurrentTicket);
    elements.nextTicket.addEventListener('click', continueToNextTicket);
    elements.feedbackOverlay.addEventListener('click', (event) => {
        if (event.target === elements.feedbackOverlay) closeFeedback();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !elements.feedbackOverlay.hidden) closeFeedback();
    });

    applyTheme(elements.root.dataset.theme);
    selectMode('guided');
})();
