# [dapp.opencontracts.io](https://dapp.opencontracts.io)

The OpenContracts Dapp, automatically generated for any Open Contract.
The client protocol logic is isolated inito https://github.com/open-contracts/client-protocol and could be used by other frontends as well. We might release it as a well-documented package once things are more stable. 

But why worry about creating a custom interface when you don't have to? :) 

We believe there's a lot to gain from focusing on one interface for all contracts:
- If everyone writes their own frontend, contract developers also have to be web developers. Why not just focus on writing Solidity, and maybe a bit of Python?
- By representing all contracts using according to same rules, users can have a much tighter understanding of the components of each contract. By including more and more automatic contract validation features into this frontend over time, users may eventually be able to convince themselves of what a contract does - even if they aren't familiar with Solidity.

So just tell us what's missing in our open-source contract frontend and we'll see if it makes sense to add it! Let's work together on building the right contract interface, instead of reinventing the wheel for every contract.
- What's the minimal amount of customization you need to create your own 'branding'?
- What's the best way to tie the (verified) contract source code closer to the interface?
- Could the interface parse the source code, and be a neutal source of info for the user about what each function will do (e.g. transfer tokens under some conditions)?

