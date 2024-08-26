import Float "mo:base/Float";
import Text "mo:base/Text";
import Error "mo:base/Error";

actor Calculator {
  public func calculate(operation: Text, num1: Float, num2: Float) : async ?Float {
    switch (operation) {
      case ("add") { ?(num1 + num2) };
      case ("subtract") { ?(num1 - num2) };
      case ("multiply") { ?(num1 * num2) };
      case ("divide") {
        if (num2 == 0) {
          null // Return null for division by zero
        } else {
          ?(num1 / num2)
        }
      };
      case (_) {
        throw Error.reject("Invalid operation")
      };
    }
  };
}
