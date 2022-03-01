# [dapp.opencontracts.io](https://dapp.opencontracts.io)

The OpenContracts Dapp, automatically generated for any Open Contract.
The client protocol logic is isolated inito https://github.com/open-contracts/client-protocol and could be used by other frontends as well. We might release it as a well-documented package once things are more stable. 

But why worry about creating a custom interface when you don't have to? :) 

We believe there's a lot to gain from focusing on one interface for all contracts:
- If everyone writes their own frontend, contract developers also have to be web developers. Why not just solidity (and a bit of python?)
- By representing all contracts using according to same rules, users can have a much tighter understanding of the components of each contract, making 

Rather tell us what's missing and we'll see if it makes sense to add into this general purpose frontend! Let's work together on building the right contract interface, instead of reinventing the wheel for every contract.
- What's the minimal amount of customization you need to create your own 'branding'?
- What's the best way to tie the (verified) contract source code closer to the interface?
- Could the interface parse the source code, and be a neutal source of info for the user about what each function will do (e.g. transfer tokens under some conditions)?

